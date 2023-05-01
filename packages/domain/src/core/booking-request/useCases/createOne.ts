import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneBookingRequestRequest } from '../CreateOneBookingRequestRequest';

export interface CreateOneBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneBookingRequestRequest & { userId: NanoId };
}

export async function createOne({
    dataSourceAdapter,
    // emailAdapter,
    logger,
    context,
    request,
}: CreateOneBookingRequestInput): Promise<boolean> {
    const {
        userId,
        cookId,
        location,
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        price,
        occasion,
        message,
        kitchenId,
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        userId,
        cookId,
        userAccepted: true,
        cookAccepted: undefined,
        latitude: location.latitude,
        longitude: location.longitude,
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        amount: price.amount,
        currencyCode: price.currencyCode,
        fee: 18,
        occasion: occasion.trim(),
        kitchenId,
        createdAt: new Date(),
    });

    if (!success) return false;

    const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        createdBy: cookId,
        createdAt: new Date(),
    });

    if (!messageSuccess) return false;

    // const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    // if (!user) return false;

    // const formattedDateTime: string = moment(dateTime).format('MMMM Do YYYY, h:mm a');

    // const emailSuccess: boolean = await emailAdapter.sendToMany(
    //     'Booking Request',
    //     ['yilmaz.cem.2603@gmail.com', 'contact@people-eat.com'],
    //     `from ${user.firstName} ${user.lastName}`,
    //     `A new Booking Request was received from <b>${user.firstName} ${
    //         user.lastName
    //     }</b><br/><br/><b>When:</b> ${formattedDateTime}<br/><b>Where:</b> ${'Todo: city name'}<br/><b>Occasion:</b> ${occasion}<br/><br/><b>Adults:</b> ${adultParticipants}<br/><b>Children:</b> ${children}<br/><br/><b>Budget:</b> ${
    //         price.amount
    //     } ${price.currencyCode}<br/><br/><b>Message:</b><br/>${message}<br/><br/><br/><b>Contact:</b><br/>Email Address: ${
    //         user.emailAddress
    //     }<br/>Phone Number: ${user.phoneNumber}<br/>`,
    // );

    return true;
}
