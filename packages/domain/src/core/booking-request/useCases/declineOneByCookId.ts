import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface FindManyBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

export async function declineOneByCookId({ runtime, context, request }: FindManyBookingRequestInput): Promise<boolean> {
    const { dataSourceAdapter, logger, webAppUrl, publisher, klaviyoEmailAdapter } = runtime;
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

    if (user.emailAddress) {
        const customerProfileGlobalBookingRequestsUrl: string = webAppUrl + `/profile/bookings/s/${bookingRequest.bookingRequestId}`;
        const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
        await klaviyoEmailAdapter.sendCookDeclinedBookingRequestNotification({
            recipient: {
                userId: user.userId,
                emailAddress: user.emailAddress,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            data: {
                bookingRequestId,
                user: {
                    firstName: user.firstName,
                    url: customerProfileGlobalBookingRequestsUrl,
                    formattedPrice: formatPrice(bookingRequest.totalAmountUser, bookingRequest.currencyCode),
                },
                cook: {
                    firstName: cookUser.firstName,
                },
            },
        });
    }

    return success;
}
