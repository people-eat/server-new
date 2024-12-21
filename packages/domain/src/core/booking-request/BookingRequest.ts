import { type BookingRequestStatus, type Location, type NanoId, type PaymentProvider, type Price } from '../shared';

export interface BookingRequest {
    bookingRequestId: NanoId;
    userId: NanoId;
    cookId: NanoId;
    status: BookingRequestStatus;
    userAccepted?: boolean;
    cookAccepted?: boolean;
    location: Location;
    dateTime: Date;
    preparationTime: number;
    duration: number;
    adultParticipants: number;
    children: number;

    travelExpenses: Price;
    totalPriceCustomer: Price;
    totalPriceCook: Price;

    fee: number;
    occasion: string;
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

    // costBreakdown: BookingRequestCostBreakdown;
}
