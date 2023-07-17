import moment from 'moment';
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

    const daysUntilEventStart: number = moment(dateTime).diff(moment(), 'days');

    if (daysUntilEventStart < 7) return false;

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
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    });

    if (!messageSuccess) return false;

    return true;
}
