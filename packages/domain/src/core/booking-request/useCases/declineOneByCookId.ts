import moment from 'moment';
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
    const { dataSourceAdapter, logger, publisher, klaviyoEmailAdapter, webAppUrl, notificationEmailAddresses } = runtime;
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

    if (!success) return false;

    await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    // Notifications

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

    await Promise.all([
        dataSourceAdapter.chatMessageRepository.insertOne(chatMessage),
        publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
            bookingRequestChatMessageCreations: chatMessage,
        }),
    ]);

    const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
    const customerProfileBookingRequestsChatUrl: string = webAppUrl + `/profile/bookings/s/${bookingRequest.bookingRequestId}`;
    const cookProfileBookingRequestsChatUrl: string = webAppUrl + `/profile/bookings/r/${bookingRequest.bookingRequestId}`;

    const emailData: KlaviyoAdapterSendCookDeclinedBookingRequest['data'] = {
        bookingRequestId,
        formattedPrice: formatPrice(bookingRequest.totalAmountUser, bookingRequest.currencyCode),
        timeLabel: moment(bookingRequest.dateTime).format('LT'),
        dateLabel: bookingRequest.dateTime.toDateString(),
        locationText: bookingRequest.locationText,
        occasion: bookingRequest.occasion,

        totalParticipants: bookingRequest.adultParticipants + bookingRequest.children,
        adults: bookingRequest.adultParticipants,
        children: bookingRequest.children,

        firstMessage: '(not supported yet)',

        configuredMenu: {
            title: '(not supported yet)',
        },

        customer: {
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress ?? 'maybe unconfirmed (not supported yet)',
            phoneNumber: user.phoneNumber ?? 'maybe unconfirmed (not supported yet)',
            url: customerProfileBookingRequestsChatUrl,
        },
        cook: {
            firstName: cookUser.firstName,
            lastName: cookUser.lastName,
            url: cookProfileBookingRequestsChatUrl,
        },
        admins: {
            url: webAppUrl + '/administration/booking-requests',
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

    for (const notificationEmail of notificationEmailAddresses) {
        await klaviyoEmailAdapter.sendCookDeclinedBookingRequestNotificationForAdmins({
            emailAddress: notificationEmail,
            data: emailData,
        });
    }

    return success;
}
