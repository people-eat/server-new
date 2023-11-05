import { cookBookingRequestCookAcceptedNotification } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization, type ChatMessage, type DataSource, type Email, type Logger, type PaymentProvider } from '../../..';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Publisher } from '../../Service';
import { type NanoId } from '../../shared';

export interface AcceptOneBookingRequestByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    publisher: Publisher;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

// probably does not belong in this file
export function calculateMenuPrice(
    adultParticipants: number,
    underagedParticipants: number,
    basePrice: number,
    basePriceCustomers: number,
    pricePerAdult: number,
    pricePerUnderaged?: number,
): number {
    if (adultParticipants + underagedParticipants <= basePriceCustomers) return basePrice;

    if (!pricePerUnderaged) return basePrice + (adultParticipants + underagedParticipants - basePriceCustomers) * pricePerAdult;

    if (adultParticipants - basePriceCustomers >= 0)
        return basePrice + (adultParticipants - basePriceCustomers) * pricePerAdult + underagedParticipants * pricePerUnderaged;

    return (underagedParticipants - basePriceCustomers - adultParticipants) * pricePerUnderaged + basePrice;
}

// eslint-disable-next-line max-statements
export async function acceptOneByCookId({
    dataSourceAdapter,
    paymentAdapter,
    logger,
    context,
    emailAdapter,
    webAppUrl,
    publisher,
    request,
}: AcceptOneBookingRequestByCookIdInput): Promise<boolean> {
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

    if (bookingRequest.cookAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: true },
    );

    // const configuredMenu: ConfiguredMenu | undefined = await dataSourceAdapter.configuredMenuRepository.findOne({ bookingRequestId });

    const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntent({
        currencyCode: bookingRequest.currencyCode,
        amount: bookingRequest.amount,
        userId: bookingRequest.userId,
        setupIntentId: bookingRequest.paymentData.setupIntentId,
    });

    if (!paymentSuccess) return false;

    const chatMessage: ChatMessage = {
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: 'Accepted the Booking Request',
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
            cookBookingRequestCookAcceptedNotification({
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
                    date: bookingRequest.dateTime.toDateString(),
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
