import { type Klaviyo, type Logger } from '@people-eat/server-domain';
import { randomUUID } from 'crypto';
import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';
import { getKlaviyoProfileIdForUser } from './getKlaviyoProfileIdForUser';

export interface CreateEmailAdapterInput {
    logger: Logger.Adapter;
    apiKey: string;
}

export function createKlaviyoEmailAdapter({ logger, apiKey }: CreateEmailAdapterInput): Klaviyo.Adapter {
    const session: ApiKeySession = new ApiKeySession(apiKey);
    const profiles: ProfilesApi = new ProfilesApi(session);
    const events: EventsApi = new EventsApi(session);

    const send = async ({ recipient, metricId, data }: Klaviyo.KlaviyoAdapterSendRequest): Promise<boolean> => {
        const klaviyoUserId: string = await getKlaviyoProfileIdForUser({ logger, profiles, user: recipient });

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
        sendBookingRequestCreatedWithMenuForCustomerConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestCreatedWithMenuForCustomerConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-created-with-menu-for-customer', data });
        },
        sendBookingRequestCreatedWithMenuForCookConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestCreatedWithMenuForCookConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-created-with-menu-for-cook', data });
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
            await send({ recipient, metricId: 'booking-request-cook-accepted', data });
        },
        sendCookDeclinedBookingRequestNotification: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewsletterSubscriptionConfirmation): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-cook-declined', data });
        },
        sendBookingRequestPaymentAnnouncementForCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestPaymentAnnouncementForCustomer): Promise<void> => {
            await send({ recipient, metricId: 'booking-request-payment-announcement-for-customer', data });
        },
    };
}
