import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';

export interface FindManyBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { cookId: NanoId };
}

export async function findManyByCookId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindManyBookingRequestInput): Promise<BookingRequest[] | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequests: DataSource.DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({
        cookId,
    });

    if (!bookingRequests) return;

    return bookingRequests.map(packLocation).map(packPrice);
}
