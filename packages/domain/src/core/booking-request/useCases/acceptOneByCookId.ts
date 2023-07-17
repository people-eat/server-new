import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';

export interface AcceptOneBookingRequestByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

export async function acceptOneByCookId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: AcceptOneBookingRequestByCookIdInput): Promise<boolean> {
    const { cookId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: true },
    );

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: 'Accepted the Booking Request',
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    });

    return success;
}
