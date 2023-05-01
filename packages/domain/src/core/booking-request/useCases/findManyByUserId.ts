import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';

export interface FindManyBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findManyByUserId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequests: DataSource.DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({
        userId,
    });

    if (!bookingRequests) return;

    return bookingRequests.map(packLocation).map(packPrice);
}
