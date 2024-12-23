import { type BookingRequestStatus, type Location, type NanoId, type Price } from '../shared';

export interface BookingRequestConditions {
    location: Location;
    dateTime: Date;
    duration: number;
    adultParticipants: number;
    children: number;
    occasion: string;
}

export type BookingRequestPaymentData = {
    provider: 'STRIPE';
    setupIntentId: string;
    clientSecret: string;
    confirmed: boolean;
    unlocked: boolean;
};

export interface BookingRequest {
    bookingRequestId: NanoId;
    globalBookingRequestId?: NanoId;
    userId: NanoId;
    cookId: NanoId;
    status: BookingRequestStatus;
    userAccepted?: boolean;
    cookAccepted?: boolean;

    conditions: BookingRequestConditions;
    preparationTime: number;
    travelExpenses: Price;
    totalPriceCustomer: Price;
    totalPriceCook: Price;

    fee: number;

    kitchenId?: NanoId;

    paymentData?: BookingRequestPaymentData;
    giftCardPromoCodeId?: string;
    appliedGiftCard?: {
        giftCardId: NanoId;
        usedAmount: number;
        usedAmountCook: number;
        usedAmountPeopleEat: number;
        usedAmountStripe: number;
    };

    suggestedMenuId?: NanoId;
    createdAt: Date;
}
