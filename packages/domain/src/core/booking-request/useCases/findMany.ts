import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type FindManyRequest } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindManyBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter, logger, context }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({});

    if (!bookingRequests) return;

    bookingRequests.sort((a: DBBookingRequest, b: DBBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return bookingRequests
        .map((bookingRequest: DBBookingRequest) => ({ ...bookingRequest, status: toBookingRequestStatus(bookingRequest) }))
        .map(packLocation)
        .map(packPrice);
}
