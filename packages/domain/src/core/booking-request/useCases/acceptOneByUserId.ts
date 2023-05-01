import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface AcceptOneBookingRequestByUserIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

export async function acceptOneByUserId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: AcceptOneBookingRequestByUserIdInput): Promise<boolean> {
    const { userId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { userId, bookingRequestId },
        { userAccepted: true },
    );

    return success;
}
