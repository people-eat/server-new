import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type Location, type NanoId } from '../../shared';

export interface UpdateBookingRequestLocationInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId; location: Location };
}

export async function updateLocation({ runtime, context, request }: UpdateBookingRequestLocationInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const { userId, bookingRequestId, location } = request;
    const { text: locationText, latitude, longitude } = location;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { userId, bookingRequestId },
        { cookAccepted: true, userAccepted: undefined, locationText, latitude, longitude },
    );

    if (!success) return false;

    await publisher.publish([bookingRequest.userId, bookingRequest.cookId], { sessionUpdates: {} });

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: `Die Adresse wurde von ${bookingRequest.locationText} zu ${locationText} geändert.`,
        generated: true,
        createdBy: userId,
        createdAt: new Date(),
    });

    return success;
}
