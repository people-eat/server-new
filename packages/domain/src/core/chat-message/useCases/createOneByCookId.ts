import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByCookId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: CreateOneChatMessageByCookIdInput): Promise<boolean> {
    const { cookId, bookingRequestId, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (!(bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true)) return false;

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: cookId,
        createdAt: new Date(),
    });

    return success;
}
