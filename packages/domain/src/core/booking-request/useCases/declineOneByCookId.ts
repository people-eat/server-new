import { cookBookingRequestCookDeclinedNotification } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
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

// eslint-disable-next-line max-statements
export async function declineOneByCookId({ runtime, context, request }: FindManyBookingRequestInput): Promise<boolean> {
    const { dataSourceAdapter, logger, webAppUrl, emailAdapter, publisher } = runtime;
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
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Bestätigung Deiner Buchungsanfrage',
            cookBookingRequestCookDeclinedNotification({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    bookingRequestId,
                    occasion: bookingRequest.occasion,
                    children: bookingRequest.children,
                    adults: bookingRequest.adultParticipants,
                    location: bookingRequest.locationText,
                    date: moment(bookingRequest.dateTime).format('L'),
                    time: moment(bookingRequest.dateTime).format('LT'),
                    price: {
                        perPerson: bookingRequest.amount / (bookingRequest.children + bookingRequest.adultParticipants),
                        total: bookingRequest.amount,
                        currency: bookingRequest.currencyCode,
                    },
                },
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    return success;
}
