import moment, { type Moment } from 'moment';
import { Authorization, type ChatMessage } from '../../..';
import { type DBBookingRequest, type DBCook, type DBUser } from '../../../data-source';
import { type KlaviyoAdapterSendCookAcceptedBookingRequest } from '../../../klaviyo';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { createOneTimeTriggeredTask } from '../../time-triggered-tasks/useCases/createOne';

export interface AcceptOneBookingRequestByCookIdInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function acceptOneByCookId({ runtime, context, request }: AcceptOneBookingRequestByCookIdInput): Promise<boolean> {
    const { dataSourceAdapter, paymentAdapter, logger, webAppUrl, publisher, klaviyoEmailAdapter, notificationEmailAddresses } = runtime;
    const { cookId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: bookingRequest.cookId });

    if (!cook) return false;

    const [payoutMethod] = cook.payoutMethods ?? [];

    if (!payoutMethod?.active) {
        runtime.logger.error('Cook without payout methods tried to accept a booking');
        return false;
    }

    if (bookingRequest.cookAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: true },
    );

    if (!success) return false;

    // Notifications

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `${cookUser.firstName} hat die Buchungsanfrage akzeptiert`,
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    };

    await dataSourceAdapter.chatMessageRepository.insertOne(chatMessage);

    await publisher.publish(`booking-request-chat-message-creations-${bookingRequestId}`, {
        bookingRequestChatMessageCreations: chatMessage,
    });

    const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
    const customerProfileBookingRequestsChatUrl: string = webAppUrl + `/profile/bookings/s/${bookingRequest.bookingRequestId}`;
    const cookProfileBookingRequestsChatUrl: string = webAppUrl + `/profile/bookings/r/${bookingRequest.bookingRequestId}`;

    const emailData: KlaviyoAdapterSendCookAcceptedBookingRequest['data'] = {
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
        await klaviyoEmailAdapter.sendCookAcceptedBookingRequestNotificationForCustomer({
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
        await klaviyoEmailAdapter.sendCookAcceptedBookingRequestNotificationForCook({
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
        await klaviyoEmailAdapter.sendCookAcceptedBookingRequestNotificationForAdmins({
            emailAddress: notificationEmail,
            data: emailData,
        });
    }

    // pub sub

    // await runtime.publisher.publish(
    //     `booking-request-updates-by-user-id-${bookingRequestId}`,
    //     await findOneByUserId({ runtime, context, request: { bookingRequestId, userId: bookingRequest.userId } }),
    // );

    // await runtime.publisher.publish(
    //     `booking-request-updates-by-cook-id-${bookingRequestId}`,
    //     await findOneByCookId({ runtime, context, request: { bookingRequestId, cookId: bookingRequest.cookId } }),
    // );

    // end of pub sub

    if (!bookingRequest.userAccepted) return true;

    // Pay if ready

    const daysUntilEvent: number = moment(bookingRequest.dateTime).diff(moment(), 'days');

    runtime.logger.info({ event: 'Cook accepted booking request which takes place in x days.', daysUntilEvent, bookingRequestId });

    if (daysUntilEvent === 15) {
        const pullPaymentDate: Moment = moment(bookingRequest.dateTime).subtract(14, 'days');
        const customerProfileGlobalBookingRequestsUrl: string = webAppUrl + `/profile/bookings/s/${bookingRequest.bookingRequestId}`;
        if (user.emailAddress) {
            await klaviyoEmailAdapter.sendBookingRequestPaymentAnnouncementForCustomer({
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
                    occasion: bookingRequest.occasion,
                    pullPaymentDate: pullPaymentDate.format('L'),
                },
            });
        }
        await createOneTimeTriggeredTask(runtime, {
            dueDate: pullPaymentDate.toDate(),
            task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId },
        });

        runtime.logger.info({ event: 'Created TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId });

        return true;
    }

    if (daysUntilEvent > 15) {
        if (user.emailAddress) {
            await createOneTimeTriggeredTask(runtime, {
                dueDate: moment(bookingRequest.dateTime).subtract(15, 'days').toDate(),
                task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT', bookingRequestId },
            });
            runtime.logger.info({ event: 'Created TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT', bookingRequestId });
        }
        await createOneTimeTriggeredTask(runtime, {
            dueDate: moment(bookingRequest.dateTime).subtract(14, 'days').toDate(),
            task: { type: 'TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId },
        });

        runtime.logger.info({ event: 'Created TIME_TRIGGERED_TASK_PULL_PAYMENT', bookingRequestId });

        return true;
    }

    const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntentFromSetupIntent({
        currencyCode: bookingRequest.currencyCode,
        pullAmount: bookingRequest.totalAmountUser,
        payoutAmount: bookingRequest.totalAmountCook,
        setupIntentId: bookingRequest.paymentData.setupIntentId,
        destinationAccountId: payoutMethod.stripeAccountId,
        bookingRequestId,
        user: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });

    runtime.logger.info({ event: 'Immediately transferred booking request costs', bookingRequestId, success: paymentSuccess });

    if (!paymentSuccess) return false;

    return true;
}
