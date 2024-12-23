import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

export async function findOneByUserId({ runtime, context, request }: FindOneBookingRequestInput): Promise<BookingRequest | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { bookingRequestId, userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        bookingRequestId,
        userId,
    });

    if (!bookingRequest) return;

    return {
        bookingRequestId: bookingRequest.bookingRequestId,
        userId: bookingRequest.userId,
        cookId: bookingRequest.cookId,
        status: toBookingRequestStatus(bookingRequest),
        userAccepted: bookingRequest.cookAccepted,
        cookAccepted: bookingRequest.userAccepted,

        conditions: {
            location: {
                text: bookingRequest.locationText,
                latitude: bookingRequest.latitude,
                longitude: bookingRequest.longitude,
            },
            dateTime: bookingRequest.dateTime,
            duration: bookingRequest.duration,
            adultParticipants: bookingRequest.adultParticipants,
            children: bookingRequest.children,
            occasion: bookingRequest.occasion,
        },
        preparationTime: bookingRequest.preparationTime,

        travelExpenses: { amount: bookingRequest.travelExpensesAmount, currencyCode: bookingRequest.currencyCode },
        totalPriceCustomer: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
        totalPriceCook: { amount: bookingRequest.totalAmountCook, currencyCode: bookingRequest.currencyCode },

        fee: bookingRequest.fee,

        globalBookingRequestId: bookingRequest.globalBookingRequestId,
        suggestedMenuId: bookingRequest.suggestedMenuId,
        createdAt: bookingRequest.createdAt,

        paymentData: bookingRequest.paymentData,
        giftCardPromoCodeId: bookingRequest.giftCardPromoCodeId,
        appliedGiftCard: bookingRequest.appliedGiftCard,
    };
}
