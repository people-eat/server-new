import { Authorization, type ChatMessage } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateSuggestedMenuInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId; suggestedMenuId: NanoId };
}

export async function updateSuggestedMenu({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request: { cookId, bookingRequestId, suggestedMenuId },
}: UpdateSuggestedMenuInput): Promise<boolean> {
    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const updateSuccess: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { bookingRequestId, cookId },
        { suggestedMenuId },
    );

    if (!updateSuccess) return false;

    await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    // Notifications

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        // cool would be a link
        message: `Es wurde eine Menü vorgeschlagen`,
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    };

    await Promise.all([
        dataSourceAdapter.chatMessageRepository.insertOne(chatMessage),
        publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
            bookingRequestChatMessageCreations: chatMessage,
        }),
    ]);

    return true;
}
