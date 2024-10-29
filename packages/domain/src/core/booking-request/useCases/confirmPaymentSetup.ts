import moment from 'moment';
import { Authorization } from '../../..';
import { type DBBookingRequest, type DBChatMessage, type DBConfiguredMenu, type DBUser } from '../../../data-source';
import { routeBuilders } from '../../routeBuilder';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface ConfirmPaymentSetupInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function confirmPaymentSetup({ runtime, context, request }: ConfirmPaymentSetupInput): Promise<boolean> {
    const { dataSourceAdapter, logger, webAppUrl, klaviyoEmailAdapter } = runtime;
    const { userId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    const { dateTime, adultParticipants, children, occasion, totalAmountUser, locationText, paymentData } = bookingRequest;

    // stripe fetch status

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { bookingRequestId },
        { paymentData: { ...paymentData, confirmed: true } },
    );

    if (!success) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!user) return false;

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.cookId });

    if (!cookUser) return false;

    const configuredMenu: DBConfiguredMenu | undefined = await dataSourceAdapter.configuredMenuRepository.findOne({ bookingRequestId });
    const chatMessage: DBChatMessage | undefined = await dataSourceAdapter.chatMessageRepository.findOne({ bookingRequestId });

    if (user.emailAddress) {
        if (!configuredMenu) return true;

        const formatPrice = (amount: number, cc: string): string => Math.round(amount / 100).toFixed(2) + ' ' + cc;

        await klaviyoEmailAdapter.sendBookingRequestCreatedWithMenuForCustomerConfirmation({
            recipient: {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                phoneNumber: user.phoneNumber,
            },
            data: {
                bookingRequestId,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    formattedPrice: formatPrice(totalAmountUser, '€'),
                    url: webAppUrl + routeBuilders.userProfileBookingRequest({ bookingRequestId }),
                },
                cook: {
                    user: {
                        firstName: cookUser.firstName,
                        lastName: cookUser.lastName,
                    },
                    formattedPrice: formatPrice(totalAmountUser, '€'),
                    url: webAppUrl + routeBuilders.cookProfileBookingRequest({ bookingRequestId }),
                },
                configuredMenu: {
                    title: configuredMenu.title,
                },

                totalParticipants: adultParticipants + children,
                adults: adultParticipants,
                children: children,

                timeLabel: moment(dateTime).format('LT'),
                dateLabel: dateTime.toDateString(),
                locationText: bookingRequest.locationText,
                occasion: occasion,

                message: chatMessage?.message ?? '',
            },
        });
    }

    if (cookUser.emailAddress) {
        if (!configuredMenu) return true;

        const formatPrice = (amount: number, cc: string): string => Math.round(amount / 100).toFixed(2) + ' ' + cc;

        await klaviyoEmailAdapter.sendBookingRequestCreatedWithMenuForCookConfirmation({
            recipient: {
                userId,
                firstName: cookUser.firstName,
                lastName: cookUser.lastName,
                emailAddress: cookUser.emailAddress,
                phoneNumber: cookUser.phoneNumber,
            },
            data: {
                bookingRequestId,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    formattedPrice: formatPrice(bookingRequest.totalAmountUser, '€'),
                    url: webAppUrl + routeBuilders.userProfileBookingRequest({ bookingRequestId }),
                },
                cook: {
                    user: {
                        firstName: cookUser.firstName,
                        lastName: cookUser.lastName,
                    },
                    formattedPrice: formatPrice(bookingRequest.totalAmountCook, '€'),
                    url: webAppUrl + routeBuilders.cookProfileBookingRequest({ bookingRequestId }),
                },
                configuredMenu: {
                    title: configuredMenu.title,
                },

                totalParticipants: adultParticipants + children,
                adults: adultParticipants,
                children: children,

                timeLabel: moment(dateTime).format('LT'),
                dateLabel: dateTime.toDateString(),
                locationText: bookingRequest.locationText,
                occasion: occasion,

                message: chatMessage?.message ?? '',
            },
        });
    }

    // seemed to be off by an hour
    // const formattedDateTime: string = moment(dateTime).format('MMMM Do YYYY, h:mm a');

    runtime.emailAdapter
        .sendToMany(
            'Menu / Cook Booking Request',
            runtime.notificationEmailAddresses,
            `from ${user.firstName} ${user.lastName}`,
            `A new Booking Request was received from <b>${user.firstName} ${
                user.lastName
            }</b><br/><br/><b>When:</b> ${dateTime.toDateString()}, ${moment(dateTime).format(
                'LT',
            )}<br/><b>Where:</b> ${locationText}<br/><b>Occasion:</b> ${occasion}<br/><br/><b>Adults:</b> ${adultParticipants}<br/><b>Children:</b> ${children}<br/><br/><b>Budget:</b><br/><b>Message:</b><br/>${chatMessage}<br/><br/><br/><b>Contact:</b><br/>Email Address: ${
                user.emailAddress
            }<br/>Phone Number: ${user.phoneNumber}`,
        )
        .then(() => undefined)
        .catch(() => undefined);

    return true;
}
