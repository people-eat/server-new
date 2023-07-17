import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';
import { toBookingRequestStatus } from './toBookingRequestStatus';

export interface FindOneBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

export async function findOneByUserId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindOneBookingRequestInput): Promise<BookingRequest | undefined> {
    const { bookingRequestId, userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DataSource.DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        bookingRequestId,
        userId,
    });

    if (!bookingRequest) return;

    return { ...packPrice(packLocation(bookingRequest)), status: toBookingRequestStatus(bookingRequest) };
}
