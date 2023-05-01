import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type NanoId } from '../../shared';
import { type BookingRequest } from '../BookingRequest';

export interface FindOneBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { bookingRequestId: NanoId };
}

export async function findOne({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindOneBookingRequestInput): Promise<BookingRequest | undefined> {
    const { bookingRequestId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const bookingRequest: DataSource.DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        bookingRequestId,
    });

    if (!bookingRequest) return;

    return packPrice(packLocation(bookingRequest));
}
