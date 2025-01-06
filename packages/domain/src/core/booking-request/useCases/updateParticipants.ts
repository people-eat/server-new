import { Authorization } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateBookingRequestParticipantsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId; adults: number; children: number };
}

export async function updateParticipants({ runtime, context, request }: UpdateBookingRequestParticipantsInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const { userId, bookingRequestId, adults, children } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        userId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.adultParticipants === adults && bookingRequest.children === children) return false;

    if (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { userId, bookingRequestId },
        { userAccepted: true, cookAccepted: undefined, adultParticipants: adults, children },
    );

    if (!success) return false;

    await publisher.publish([bookingRequest.userId, bookingRequest.cookId], { sessionUpdates: {} });

    let message: string = '';

    if (bookingRequest.adultParticipants === adults && bookingRequest.children !== children)
        message = `Die Anzahl der Kinder wurde von ${bookingRequest.children} zu ${children} geändert.`;

    if (bookingRequest.adultParticipants !== adults && bookingRequest.children === children)
        message = `Die Anzahl der erwachsenen Teilnehmer wurde von ${bookingRequest.adultParticipants} zu ${adults} geändert.`;

    if (bookingRequest.adultParticipants !== adults && bookingRequest.children !== children)
        message = `Die Anzahl der erwachsenen Teilnehmer wurde von ${bookingRequest.adultParticipants} zu ${adults} geändert und die Anzahl der Kinder wurde von ${bookingRequest.children} zu ${children} geändert.`;

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message,
        generated: true,
        createdBy: userId,
        createdAt: new Date(),
    });

    return success;
}
