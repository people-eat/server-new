import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { bookingRequestId: NanoId };
}

export async function findOne({ runtime, context, request }: FindOneBookingRequestInput): Promise<BookingRequest | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { bookingRequestId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const bookingRequest: DataSource.DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        bookingRequestId,
    });

    if (!bookingRequest) return;

    return {
        ...packLocation(bookingRequest),
        status: toBookingRequestStatus(bookingRequest),
        price: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
        priceCook: { amount: bookingRequest.totalAmountCook, currencyCode: bookingRequest.currencyCode },
        priceUser: { amount: bookingRequest.totalAmountUser, currencyCode: bookingRequest.currencyCode },
    };
}
