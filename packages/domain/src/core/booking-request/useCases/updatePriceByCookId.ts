import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId, type Price } from '../../shared';

export interface UpdateBookingRequestPriceByCookIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId; price: Price };
}

export async function updatePriceByCookId({ runtime, context, request }: UpdateBookingRequestPriceByCookIdInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
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

    if (!success) return false;

    await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Suggested ${price.amount} ${price.currencyCode} instead of ${bookingRequest.totalAmountUser} ${bookingRequest.currencyCode}`,
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    });

    return success;
}
