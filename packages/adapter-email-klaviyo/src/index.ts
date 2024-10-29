import { type Klaviyo, type Logger, type User } from '@people-eat/server-domain';
import { randomUUID } from 'crypto';
import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';

export interface CreateEmailAdapterInput {
    logger: Logger.Adapter;
    apiKey: string;
}

export function createKlaviyoEmailAdapter({ logger, apiKey }: CreateEmailAdapterInput): Klaviyo.Adapter {
    const session: ApiKeySession = new ApiKeySession(apiKey);
    const profiles: ProfilesApi = new ProfilesApi(session);
    const events: EventsApi = new EventsApi(session);

    const getKlaviyoUserId = async (
        user: Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>,
    ): Promise<string> => {
        const { body: getResponseBody } = await profiles.getProfiles({ filter: `equals(external_id,"${user.userId}")` });
        const [existingProfile] = getResponseBody.data;

        if (!existingProfile) {
            logger.info(`Requested Klaviyo profile for PeopleEat user with id '${user.userId}' and did not receive one.`);

            const { body: getResponseBodyByEmail } = await profiles.getProfiles({ filter: `equals(email,"${user.emailAddress}")` });
            const [existingProfileByEmail] = getResponseBodyByEmail.data;

            if (existingProfileByEmail && existingProfileByEmail.id) {
                logger.info(
                    `Requested Klaviyo profile for PeopleEat user with email address '${
                        user.emailAddress
                    }' and did receive one:\n${JSON.stringify(existingProfileByEmail)}`,
                );
                await profiles.updateProfile(existingProfileByEmail.id, {
                    data: {
                        id: existingProfileByEmail.id,
                        type: 'profile',
                        attributes: {
                            externalId: user.userId,
                        },
                    },
                });
                logger.info(
                    `Updated external id of Klaviyo profile with email address '${user.emailAddress}' from ${existingProfileByEmail.id} to ${user.userId}}`,
                );
                return existingProfileByEmail.id;
            }

            try {
                const { body: createResponseBody } = await profiles.createProfile({
                    data: {
                        type: 'profile',
                        attributes: {
                            externalId: user.userId,
                            email: user.emailAddress,
                            // phoneNumber: user.phoneNumber,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                    },
                });

                logger.info(
                    `Created Klaviyo profile for PeopleEat user with id '${user.userId}'\n${JSON.stringify(createResponseBody.data)}`,
                );

                return createResponseBody.data.id ?? '';
            } catch (error) {
                logger.error(error);
                logger.error(`Could not create Klaviyo profile for user data \n${JSON.stringify(user)}`);
                return '';
            }
        }

        logger.info(
            `Requested Klaviyo profile for PeopleEat user with id '${user.userId}' and did receive one:\n${JSON.stringify(
                existingProfile,
            )}`,
        );

        return existingProfile.id ?? '';
    };

    const send = async ({ recipient, metricId, data }: Klaviyo.KlaviyoAdapterSendRequest): Promise<boolean> => {
        const klaviyoUserId: string = await getKlaviyoUserId(recipient);

        await events.createEvent({
            data: {
                type: 'event',
                attributes: {
                    uniqueId: randomUUID(),
                    properties: data,
                    profile: { data: { type: 'profile', id: klaviyoUserId, attributes: {} } },
                    metric: { data: { type: 'metric', attributes: { name: metricId } } },
                },
            },
        });

        return true;
    };

    return {
        send,
        sendGlobalBookingRequestCreatedForCustomerConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestCreatedForCustomerConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'global-booking-request-created-for-customer', data });
        },
        sendGlobalBookingMatchedForCustomerConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCustomerRequest): Promise<void> => {
            await send({ recipient, metricId: 'global-booking-request-matched-for-customer', data });
        },
        sendGlobalBookingMatchedForCookConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCookRequest): Promise<void> => {
            await send({ recipient, metricId: 'global-booking-request-matched-for-cook', data });
        },
        sendBookingRequestWithMenuCreatedToCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestWithMenuCreatedRequest): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-with-menu-created', data });
        },
        sendGiftCardPurchaseConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest): Promise<void> => {
            await send({ recipient, metricId: 'gift-card-purchase', data });
        },
        sendGiftCardDelivery: async ({ recipient, data }: Klaviyo.KlaviyoAdapterSendGiftCardDelivery): Promise<void> => {
            await send({ recipient, metricId: 'gift-card-delivery', data });
        },
        sendResetPassword: async ({ recipient, data }: Klaviyo.KlaviyoAdapterSendResetPassword): Promise<void> => {
            await send({ recipient, metricId: 'reset-password', data });
        },
        sendNewChatMessageNotification: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewChatMessageNotification): Promise<void> => {
            await send({ recipient, metricId: 'send-chat-message', data });
        },
        sendNewsletterSubscriptionConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewsletterSubscriptionConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'newsletter-subscription', data });
        },
        sendCookAcceptedBookingRequestNotification: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewsletterSubscriptionConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-cook-declined', data });
        },
        sendCookDeclinedBookingRequestNotification: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewsletterSubscriptionConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-cook-accepted', data });
        },
        sendBookingRequestPaymentAnnouncementForCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestPaymentAnnouncementForCustomer): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-payment-announcement-for-customer', data });
        },
    };
}
