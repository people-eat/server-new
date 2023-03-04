import { Authorization, Database, Logger } from '../../index.js';
import packLocation from '../packLocation.js';
import packPrice from '../packPrice.js';
import { BookingRequest } from './BookingRequest.js';

export interface FindManyBookingRequestsInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function findManyBookingRequests({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyBookingRequestsInput): Promise<BookingRequest[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const bookingRequests: Database.DBBookingRequest[] | undefined = await databaseAdapter.bookingRequestRepository.findMany({});

    if (!bookingRequests) return;

    return bookingRequests.map(packLocation).map(packPrice);
}
