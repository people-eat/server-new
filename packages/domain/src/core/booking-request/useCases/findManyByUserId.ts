import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindManyBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findManyByUserId({ runtime, context, request }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({
        userId,
    });

    if (!bookingRequests) return;

    bookingRequests.sort((a: DBBookingRequest, b: DBBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return bookingRequests
        .filter((bookingRequest: DBBookingRequest) => bookingRequest.paymentData.confirmed)
        .map((bookingRequest: DBBookingRequest) => ({ ...bookingRequest, status: toBookingRequestStatus(bookingRequest) }))
        .map(packLocation)
        .map(packPrice);
}
