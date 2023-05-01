import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type FindManyRequest } from '../../shared';
import { type BookingRequest } from '../BookingRequest';

export interface FindManyBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter, logger, context }: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const bookingRequests: DataSource.DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({});

    if (!bookingRequests) return;

    return bookingRequests.map(packLocation).map(packPrice);
}
