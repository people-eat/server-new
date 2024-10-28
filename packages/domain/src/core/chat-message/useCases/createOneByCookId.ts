import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByCookIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByCookId({
    runtime: { dataSourceAdapter, logger, webAppUrl, publisher, klaviyoEmailAdapter },
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

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) return false;

    const customerUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!customerUser) return false;

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: cookId,
        createdAt: new Date(),
    };

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    if (!customerUser.emailAddress) return true;

    const bookingRequestsUrl: string = webAppUrl + '/profile/bookings/' + 's/' + bookingRequestId;

    klaviyoEmailAdapter
        .sendNewChatMessageNotification({
            recipient: {
                userId: customerUser.userId,
                firstName: customerUser.firstName,
                lastName: customerUser.lastName,
                emailAddress: customerUser.emailAddress,
            },
            data: {
                url: bookingRequestsUrl,
                message,
                recipient: {
                    firstName: customerUser.firstName,
                },
                sender: {
                    firstName: cookUser.firstName,
                },
            },
        })
        .then(() => undefined)
        .catch(() => undefined);

    return success;
}
