import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId, type Price } from '../../shared';

export interface UpdateBookingRequestPriceByUserIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId; price: Price };
}

export async function updatePriceByUserId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateBookingRequestPriceByUserIdInput): Promise<boolean> {
    const { userId, bookingRequestId, price } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { userId, bookingRequestId },
        { userAccepted: true, cookAccepted: undefined, ...price },
    );

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Suggested ${price.amount} ${price.currencyCode} instead of ${bookingRequest.amount} ${bookingRequest.currencyCode}`,
        generated: true,
        createdBy: userId,
        createdAt: new Date(),
    });

    return success;
}
