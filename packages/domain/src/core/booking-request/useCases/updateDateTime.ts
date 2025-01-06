import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateBookingRequestDateTimeInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId; dateTime: Date };
}

export async function updateDateTime({ runtime, context, request }: UpdateBookingRequestDateTimeInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const { userId, bookingRequestId, dateTime } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { userId, bookingRequestId },
        { userAccepted: true, cookAccepted: undefined, dateTime },
    );

    if (!success) return false;

    await publisher.publish([bookingRequest.userId, bookingRequest.cookId], { sessionUpdates: {} });

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Das Datum wurde vom ${bookingRequest.dateTime} zum ${dateTime} geändert.`,
        generated: true,
        createdBy: userId,
        createdAt: new Date(),
    });

    return success;
}
