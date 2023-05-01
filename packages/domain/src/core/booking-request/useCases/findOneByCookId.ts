import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';

export interface FindOneBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

export async function findOneByCookId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindOneBookingRequestInput): Promise<BookingRequest | undefined> {
    const { bookingRequestId, cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DataSource.DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        bookingRequestId,
        cookId,
    });

    if (!bookingRequest) return;

    return packPrice(packLocation(bookingRequest));
}
