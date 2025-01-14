import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindManyBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ runtime, context }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findAll();

    if (!bookingRequests) return;

    bookingRequests.sort((a: DBBookingRequest, b: DBBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return bookingRequests.map((bookingRequest: DBBookingRequest) => ({
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
    }));
}
