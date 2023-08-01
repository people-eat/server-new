import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBGlobalBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';

export interface CreateOneBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; globalBookingRequestId: NanoId };
}

export async function createOneByGlobalBookingRequestId({
    dataSourceAdapter,
    // emailAdapter,
    logger,
    context,
    request,
}: CreateOneBookingRequestInput): Promise<boolean> {
    const { cookId, globalBookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const globalBookingRequest: DBGlobalBookingRequest | undefined = await dataSourceAdapter.globalBookingRequestRepository.findOne({
        globalBookingRequestId,
    });

    if (!globalBookingRequest) return false;

    const {
        userId,
        adultParticipants,
        children,
        amount,
        currencyCode,
        dateTime,
        duration,
        occasion,
        message,
        kitchenId,
        latitude,
        longitude,
        // expiresAt,
        // createdAt,
    } = globalBookingRequest;

    const bookingRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        cookId,
        userId,
        cookAccepted: true,
        userAccepted: true,
        latitude,
        longitude,
        dateTime,
        preparationTime: 120,
        duration,
        adultParticipants,
        children,
        amount,
        currencyCode,
        fee: 18,
        occasion,
        kitchenId,
        globalBookingRequestId,
        createdAt: new Date(),
        paymentData: {
            provider: 'STRIPE',
            setupIntentId: '',
            clientSecret: '',
        },
    });

    if (!success) return false;

    const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message,
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    });

    if (!messageSuccess) return false;

    return true;
}
