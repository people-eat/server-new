import { bookingRequestNewMessage } from '@people-eat/server-adapter-email-template';
import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneChatMessageRequest } from '../CreateOneChatMessageRequest';

export interface CreateOneChatMessageByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest;
}

export async function createOneByCookId({
    dataSourceAdapter,
    logger,
    emailAdapter,
    webAppUrl,
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

    const success: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: cookId,
        createdAt: new Date(),
    });

    if (!customerUser.emailAddress) return true;

    const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
        'PeopleEat',
        customerUser.emailAddress,
        `Neue Nachricht ${cookUser.firstName}`,
        bookingRequestNewMessage({
            webAppUrl,
            recipient: { firstName: customerUser.firstName },
            sender: { firstName: cookUser.firstName },
        }),
    );

    if (!customerEmailSuccess) logger.info('sending email failed');

    return success;
}
