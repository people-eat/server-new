import { type BookingRequestStatus, type Location, type NanoId, type PaymentProvider, type Price } from '../shared';

export interface BookingRequestConditions {
    location: Location;
    dateTime: Date;
    duration: number;
    adultParticipants: number;
    children: number;
    occasion: string;
}

export interface BookingRequest {
    bookingRequestId: NanoId;
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
    globalBookingRequestId?: NanoId;
    suggestedMenuId?: NanoId;
    createdAt: Date;

    paymentData: {
        provider: PaymentProvider;
        setupIntentId: string;
        clientSecret: string;
        confirmed: boolean;
        unlocked: boolean;
    };

    giftCardPromoCodeId?: string;

    appliedGiftCard?: {
        giftCardId: NanoId;
        usedAmount: number;
        usedAmountCook: number;
        usedAmountPeopleEat: number;
        usedAmountStripe: number;
    };
}
