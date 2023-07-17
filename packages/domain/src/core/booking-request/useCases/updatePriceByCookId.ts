import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId, type Price } from '../../shared';

export interface UpdateBookingRequestPriceByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId; price: Price };
}

export async function updatePriceByCookId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateBookingRequestPriceByCookIdInput): Promise<boolean> {
    const { cookId, bookingRequestId, price } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: true, userAccepted: undefined, ...price },
    );

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Suggested ${price.amount} ${price.currencyCode} instead of ${bookingRequest.amount} ${bookingRequest.currencyCode}`,
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    });

    return success;
}
