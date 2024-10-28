import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByUserIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByUserId({
    runtime: { dataSourceAdapter, logger, webAppUrl, publisher, klaviyoEmailAdapter },
    context,
    request,
}: CreateOneChatMessageByUserIdInput): Promise<boolean> {
    const { userId, bookingRequestId, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (!(bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true)) return false;

    const customerUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!customerUser) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    };

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    if (!cookUser.emailAddress) return true;

    const bookingRequestsUrl: string = webAppUrl + '/profile/bookings/' + 'r/' + bookingRequestId;

    klaviyoEmailAdapter
        .sendNewChatMessageNotification({
            recipient: {
                userId: cookUser.userId,
                firstName: cookUser.firstName,
                lastName: cookUser.lastName,
                emailAddress: cookUser.emailAddress,
            },
            data: {
                url: bookingRequestsUrl,
                message,
                recipient: {
                    firstName: cookUser.firstName,
                },
                sender: {
                    firstName: customerUser.firstName,
                },
            },
        })
        .then(() => undefined)
        .catch(() => undefined);

    return success;
}
