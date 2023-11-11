import { menuBookingRequestCookConfirmation, menuBookingRequestCustomerConfirmation } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization } from '../../..';
import { type DBBookingRequest, type DBChatMessage, type DBConfiguredMenu, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface ConfirmPaymentSetupInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function confirmPaymentSetup({ runtime, context, request }: ConfirmPaymentSetupInput): Promise<boolean> {
    const { dataSourceAdapter, logger, emailAdapter, webAppUrl } = runtime;
    const { userId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    const { dateTime, adultParticipants, children, occasion, amount, currencyCode, locationText } = bookingRequest;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const configuredMenu: DBConfiguredMenu | undefined = await dataSourceAdapter.configuredMenuRepository.findOne({ bookingRequestId });
    const chatMessage: DBChatMessage | undefined = await dataSourceAdapter.chatMessageRepository.findOne({ bookingRequestId });

    if (user.emailAddress) {
        if (!configuredMenu) return true;

        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Bestätigung Deiner Buchungsanfrage',
            menuBookingRequestCustomerConfirmation({
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
                    occasion,
                    children,
                    adults: adultParticipants,
                    location: locationText ?? '',
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: amount / (children + adultParticipants),
                        total: amount,
                        currency: currencyCode,
                    },
                    menu: {
                        hasGreetingFromKitchen: Boolean(configuredMenu.greetingFromKitchen),
                        title: configuredMenu.title,
                        categories: [],
                        kitchen: undefined,
                        allergies: [],
                        courses: configuredMenu.courses,
                    },
                },
                chatMessage: chatMessage?.message ?? '',
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    if (cookUser.emailAddress) {
        if (!configuredMenu) return true;

        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            cookUser.emailAddress,
            `Neue Buchungsanfrage ${user.firstName}`,
            menuBookingRequestCookConfirmation({
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
                    occasion,
                    children,
                    adults: adultParticipants,
                    location: locationText ?? '',
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: amount / (children + adultParticipants),
                        total: amount,
                        currency: currencyCode,
                    },
                    menu: {
                        hasGreetingFromKitchen: Boolean(configuredMenu.greetingFromKitchen),
                        title: configuredMenu.title,
                        categories: [],
                        kitchen: undefined,
                        allergies: [],
                        courses: configuredMenu.courses,
                    },
                },
                chatMessage: chatMessage?.message ?? '',
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    return true;
}
