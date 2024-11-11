import { type Klaviyo, type Logger } from '@people-eat/server-domain';
import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';
import { sendToEmail } from './sendToEmail';
import { sendToUser } from './sendToUser';

export interface CreateEmailAdapterInput {
    logger: Logger.Adapter;
    apiKey: string;
}

export function createKlaviyoEmailAdapter({ logger, apiKey }: CreateEmailAdapterInput): Klaviyo.Adapter {
    const session: ApiKeySession = new ApiKeySession(apiKey);
    const profiles: ProfilesApi = new ProfilesApi(session);
    const events: EventsApi = new EventsApi(session);

    return {
        newMetricKey: async (): Promise<void> => {
            // const metricId: string = 'global-booking-request-created-for-admins';
            // await sendToUser({
            //     logger,
            //     profiles,
            //     events,
            //     recipient: {
            //         userId: '88c0fyYn5ZIYITHKfERz',
            //         firstName: 'Cem',
            //         lastName: 'Yilmaz',
            //         phoneNumber: undefined,
            //         emailAddress: 'yilmaz.cem.2603@gmail.com',
            //     },
            //     metricId,
            //     data: {},
            // });
        },
        sendGlobalBookingRequestCreatedForCustomerConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestCreatedForCustomerConfirmation): Promise<void> => {
            const metricId: string = 'global-booking-request-created-for-customer';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendGlobalBookingMatchedForCustomerConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCustomerRequest): Promise<void> => {
            const metricId: string = 'global-booking-request-matched-for-customer';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendGlobalBookingMatchedForCookConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCookRequest): Promise<void> => {
            const metricId: string = 'global-booking-request-matched-for-cook';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendBookingRequestCreatedWithMenuForCustomerConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestCreatedWithMenuForCustomerConfirmation): Promise<void> => {
            const metricId: string = 'booking-request-created-with-menu-for-customer';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendBookingRequestCreatedWithMenuForCookConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestCreatedWithMenuForCookConfirmation): Promise<void> => {
            const metricId: string = 'booking-request-created-with-menu-for-cook';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendGiftCardPurchaseConfirmation: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest): Promise<void> => {
            const metricId: string = 'gift-card-purchase';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendGiftCardDelivery: async ({ recipient, data }: Klaviyo.KlaviyoAdapterSendGiftCardDelivery): Promise<void> => {
            const metricId: string = 'gift-card-delivery';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendResetPassword: async ({ recipient, data }: Klaviyo.KlaviyoAdapterSendResetPassword): Promise<void> => {
            const metricId: string = 'reset-password';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendNewChatMessageNotification: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewChatMessageNotification): Promise<void> => {
            const metricId: string = 'send-chat-message';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendNewsletterSubscriptionConfirmation: async ({
            email,
            data,
        }: Klaviyo.KlaviyoAdapterSendNewsletterSubscriptionConfirmation): Promise<void> => {
            const metricId: string = 'newsletter-subscription';
            await sendToEmail({ logger, profiles, events, email, metricId, data });
        },
        sendCookAcceptedBookingRequestNotificationForCook: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendCookAcceptedBookingRequest): Promise<void> => {
            const metricId: string = 'booking-request-cook-accepted-for-cook';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendCookAcceptedBookingRequestNotificationForCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendCookAcceptedBookingRequest): Promise<void> => {
            const metricId: string = 'booking-request-cook-accepted-for-customer';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendCookAcceptedBookingRequestNotificationForAdmins: async ({
            emailAddress,
            data,
        }: Klaviyo.KlaviyoAdapterSendCookAcceptedBookingRequestForAdmins): Promise<void> => {
            const metricId: string = 'booking-request-cook-accepted-for-admins';
            await sendToEmail({ logger, profiles, events, email: emailAddress, metricId, data });
        },
        sendCookDeclinedBookingRequestNotificationForCook: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendCookDeclinedBookingRequest): Promise<void> => {
            const metricId: string = 'booking-request-cook-declined-for-cook';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendCookDeclinedBookingRequestNotificationForCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendCookDeclinedBookingRequest): Promise<void> => {
            const metricId: string = 'booking-request-cook-declined-for-customer';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
        sendCookDeclinedBookingRequestNotificationForAdmins: async ({
            emailAddress,
            data,
        }: Klaviyo.KlaviyoAdapterSendCookDeclinedBookingRequestForAdmins): Promise<void> => {
            const metricId: string = 'booking-request-cook-declined-for-admins';
            await sendToEmail({ logger, profiles, events, email: emailAddress, metricId, data });
        },
        sendBookingRequestPaymentAnnouncementForCustomer: async ({
            recipient,
            data,
        }: Klaviyo.KlaviyoAdapterSendBookingRequestPaymentAnnouncementForCustomer): Promise<void> => {
            const metricId: string = 'booking-request-payment-announcement-for-customer';
            await sendToUser({ logger, profiles, events, recipient, metricId, data });
        },
    };
}
