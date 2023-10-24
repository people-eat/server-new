import { cookBookingRequestCookConfirmation, cookBookingRequestCustomerConfirmation } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface ConfirmPaymentSetupInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

export async function confirmPaymentSetup({
    dataSourceAdapter,
    logger,
    emailAdapter,
    webAppUrl,
    context,
    request,
}: ConfirmPaymentSetupInput): Promise<boolean> {
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

    if (user.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Bestätigung Deiner Buchungsanfrage',
            cookBookingRequestCustomerConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
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
                },
                // todo
                chatMessage: '',
                // message.trim(),
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    if (cookUser.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            cookUser.emailAddress,
            `Neue Buchungsanfrage ${user.firstName}`,
            cookBookingRequestCookConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
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
                },
                // todo
                chatMessage: '',
                // message.trim(),
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    return true;
}
