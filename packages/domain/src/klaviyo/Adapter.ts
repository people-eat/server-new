import { type User } from '../core';
import { type NanoId } from '../core/shared';

type Recipient = Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>;

export interface KlaviyoAdapterSendRequest {
    recipient: Recipient;
    metricId: string;
    data: object;
}

export interface KlaviyoAdapterSendGlobalBookingRequestCreatedForCustomerConfirmation {
    recipient: Recipient;
    data: {
        globalBookingRequestId: NanoId;
        totalParticipants: number;
        adults: number;
        children: number;
        priceClassTypeLabel: string;
        timeLabel: string;
        dateLabel: string;
        locationText: string;
        occasion: string;
        message: string;
        confirmEmailAddressUrl: string;
    };
}

export interface KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCustomerRequest {
    recipient: Recipient;
    data: {
        bookingRequestId: NanoId;
        customer: {
            user: {
                firstName: string;
            };
            url: string;
        };
        cook: {
            user: {
                firstName: string;
            };
        };

        configuredMenu: {
            title: string | undefined;
        };
        occasion: string;

        timeLabel: string;
        dateLabel: string;
        locationText: string;
    };
}

export interface KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCookRequest {
    recipient: Recipient;
    data: {
        bookingRequestId: NanoId;
        customer: {
            user: {
                firstName: string;
            };
        };
        cook: {
            user: {
                firstName: string;
            };
            url: string;
        };

        configuredMenu: {
            title: string | undefined;
        };
        occasion: string;

        timeLabel: string;
        dateLabel: string;
        locationText: string;
    };
}

export interface KlaviyoAdapterSendBookingRequestCreatedWithMenuForCustomerConfirmation {
    recipient: Recipient;
    data: {
        bookingRequestId: NanoId;
        user: {
            firstName: string;
            lastName: string;
            formattedPrice: string;
            url: string;
        };
        cook: {
            user: {
                firstName: string;
                lastName: string;
            };
            formattedPrice: string;
            url: string;
        };
        configuredMenu: {
            title: string;
        };

        totalParticipants: number;
        adults: number;
        children: number;

        timeLabel: string;
        dateLabel: string;
        locationText: string;
        occasion: string;

        message: string;
    };
}

export interface KlaviyoAdapterSendBookingRequestCreatedWithMenuForCookConfirmation {
    recipient: Recipient;
    data: {
        bookingRequestId: NanoId;
        user: {
            firstName: string;
            lastName: string;
            formattedPrice: string;
            url: string;
        };
        cook: {
            user: {
                firstName: string;
                lastName: string;
            };
            formattedPrice: string;
            url: string;
        };
        configuredMenu: {
            title: string;
        };

        totalParticipants: number;
        adults: number;
        children: number;

        timeLabel: string;
        dateLabel: string;
        locationText: string;
        occasion: string;

        message: string;
    };
}

export interface KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest {
    recipient: Recipient;
    data: {
        occasion: string;
        recipient: {
            firstName: string;
        };
        formattedPrice: string;
        automaticDeliveryEnabledLabel: string;
    };
}

export interface KlaviyoAdapterSendGiftCardDelivery {
    recipient: Recipient;
    data: {
        recipient: {
            firstName: string;
        };
        buyer: {
            firstName: string;
            lastName: string;
        };
        message: string;
        formattedPrice: string;
        redeemCode: string;
    };
}

export interface KlaviyoAdapterSendResetPassword {
    recipient: Recipient;
    data: {
        url: string;
    };
}

export interface KlaviyoAdapterSendNewChatMessageNotification {
    recipient: Recipient;
    data: {
        url: string;
        message: string;
        recipient: {
            firstName: string;
        };
        sender: {
            firstName: string;
        };
    };
}

export interface KlaviyoAdapterSendNewsletterSubscriptionConfirmation {
    email: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: {};
    // todo make send param data optional for no-payload emails
}

interface CookAcceptedBookingRequestEventPayload {
    bookingRequestId: NanoId;
    formattedPrice: string;
    timeLabel: string;
    dateLabel: string;
    locationText: string;
    occasion: string;

    totalParticipants: number;
    adults: number;
    children: number;

    firstMessage: string;

    configuredMenu?: {
        title: string;
    };

    customer: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        phoneNumber: string;
        /** to chat */
        url: string;
    };
    cook: {
        firstName: string;
        lastName: string;
        /** to chat */
        url: string;
    };
    admins: {
        url: string;
    };
}

export interface KlaviyoAdapterSendCookAcceptedBookingRequest {
    recipient: Recipient;
    data: CookAcceptedBookingRequestEventPayload;
}

export interface KlaviyoAdapterSendCookAcceptedBookingRequestForAdmins {
    emailAddress: string;
    data: CookAcceptedBookingRequestEventPayload;
}

interface CookDeclinedBookingRequestEventPayload {
    bookingRequestId: NanoId;
    formattedPrice: string;
    timeLabel: string;
    dateLabel: string;
    locationText: string;
    occasion: string;

    totalParticipants: number;
    adults: number;
    children: number;

    firstMessage: string;

    configuredMenu?: {
        title: string;
    };

    customer: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        phoneNumber: string;
        /** to chat */
        url: string;
    };
    cook: {
        firstName: string;
        lastName: string;
        /** to chat */
        url: string;
    };
    admins: {
        url: string;
    };
}

export interface KlaviyoAdapterSendCookDeclinedBookingRequest {
    recipient: Recipient;
    data: CookDeclinedBookingRequestEventPayload;
}

export interface KlaviyoAdapterSendCookDeclinedBookingRequestForAdmins {
    emailAddress: string;
    data: CookDeclinedBookingRequestEventPayload;
}

export interface KlaviyoAdapterSendBookingRequestPaymentAnnouncementForCustomer {
    recipient: Recipient;
    data: {
        bookingRequestId: NanoId;
        user: {
            firstName: string;
            // /** to request */
            url: string;
            formattedPrice: string;
        };
        occasion: string;
        pullPaymentDate: string;
    };
}

export interface Adapter {
    newMetricKey(): Promise<void>;
    sendGlobalBookingRequestCreatedForCustomerConfirmation(
        request: KlaviyoAdapterSendGlobalBookingRequestCreatedForCustomerConfirmation,
    ): Promise<void>;
    sendGlobalBookingMatchedForCustomerConfirmation(
        request: KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCustomerRequest,
    ): Promise<void>;
    sendGlobalBookingMatchedForCookConfirmation(
        request: KlaviyoAdapterSendGlobalBookingRequestMatchedConfirmationForCookRequest,
    ): Promise<void>;
    sendBookingRequestCreatedWithMenuForCustomerConfirmation(
        request: KlaviyoAdapterSendBookingRequestCreatedWithMenuForCustomerConfirmation,
    ): Promise<void>;
    sendBookingRequestCreatedWithMenuForCookConfirmation(
        request: KlaviyoAdapterSendBookingRequestCreatedWithMenuForCookConfirmation,
    ): Promise<void>;
    sendGiftCardPurchaseConfirmation(request: KlaviyoAdapterSendGiftCardPurchaseConfirmationRequest): Promise<void>;
    sendGiftCardDelivery(request: KlaviyoAdapterSendGiftCardDelivery): Promise<void>;
    sendResetPassword(request: KlaviyoAdapterSendResetPassword): Promise<void>;
    sendNewChatMessageNotification(request: KlaviyoAdapterSendNewChatMessageNotification): Promise<void>;
    sendNewsletterSubscriptionConfirmation(request: KlaviyoAdapterSendNewsletterSubscriptionConfirmation): Promise<void>;
    sendCookAcceptedBookingRequestNotificationForCustomer(request: KlaviyoAdapterSendCookAcceptedBookingRequest): Promise<void>;
    sendCookAcceptedBookingRequestNotificationForCook(request: KlaviyoAdapterSendCookAcceptedBookingRequest): Promise<void>;
    sendCookAcceptedBookingRequestNotificationForAdmins(request: KlaviyoAdapterSendCookAcceptedBookingRequestForAdmins): Promise<void>;
    sendCookDeclinedBookingRequestNotificationForCustomer(request: KlaviyoAdapterSendCookDeclinedBookingRequest): Promise<void>;
    sendCookDeclinedBookingRequestNotificationForCook(request: KlaviyoAdapterSendCookDeclinedBookingRequest): Promise<void>;
    sendCookDeclinedBookingRequestNotificationForAdmins(request: KlaviyoAdapterSendCookDeclinedBookingRequestForAdmins): Promise<void>;
    sendBookingRequestPaymentAnnouncementForCustomer(
        request: KlaviyoAdapterSendBookingRequestPaymentAnnouncementForCustomer,
    ): Promise<void>;
}
