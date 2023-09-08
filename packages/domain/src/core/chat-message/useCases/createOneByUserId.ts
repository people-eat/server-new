import { bookingRequestNewMessage } from '@people-eat/server-adapter-email-template';
import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByUserIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByUserId({
    dataSourceAdapter,
    logger,
    emailAdapter,
    webAppUrl,
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

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    });

    if (!cookUser.emailAddress) return true;

    const cookEmailSuccess: boolean = await emailAdapter.sendToOne(
        customerUser.firstName,
        cookUser.emailAddress,
        'Neue Nachricht',
        bookingRequestNewMessage({
            webAppUrl,
            recipient: { firstName: customerUser.firstName },
            sender: { firstName: cookUser.firstName },
        }),
    );

    if (!cookEmailSuccess) logger.info('sending email failed');

    return success;
}
