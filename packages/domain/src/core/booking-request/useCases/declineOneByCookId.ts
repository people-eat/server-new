import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { type KlaviyoAdapterSendCookDeclinedBookingRequest } from '../../../klaviyo';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface FindManyBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

export async function declineOneByCookId({ runtime, context, request }: FindManyBookingRequestInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher, klaviyoEmailAdapter } = runtime;
    const { cookId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: false },
    );

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Privatkoch:in ${cookUser.firstName} hat die Buchungsanfrage abgelehnt`,
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    };

    await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
    const emailData: KlaviyoAdapterSendCookDeclinedBookingRequest['data'] = {
        bookingRequestId,
        formattedPrice: formatPrice(bookingRequest.totalAmountUser, bookingRequest.currencyCode),
        user: {
            firstName: user.firstName,
        },
        cook: {
            firstName: cookUser.firstName,
        },
    };

    if (user.emailAddress) {
        await klaviyoEmailAdapter.sendCookDeclinedBookingRequestNotificationForCustomer({
            recipient: {
                userId: user.userId,
                emailAddress: user.emailAddress,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            data: emailData,
        });
    }

    if (cookUser.emailAddress) {
        await klaviyoEmailAdapter.sendCookDeclinedBookingRequestNotificationForCook({
            recipient: {
                userId: cookUser.userId,
                emailAddress: cookUser.emailAddress,
                phoneNumber: cookUser.phoneNumber,
                firstName: cookUser.firstName,
                lastName: cookUser.lastName,
            },
            data: emailData,
        });
    }

    return success;
}
