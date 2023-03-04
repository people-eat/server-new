import { Authorization, Database, Logger } from '../../index.js';
import { BookingRequestAllergy } from './BookingRequestAllergy.js';

export interface FindManyBookingRequestAllergiesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string; bookingRequestId: string };
}

export async function findManyBookingRequestAllergies({
    databaseAdapter,
    logger,
    context,
    request: { userId, bookingRequestId },
}: FindManyBookingRequestAllergiesInput): Promise<BookingRequestAllergy[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    // TODO: incorporate userId

    const addresses: Database.DBBookingRequestAllergy[] | undefined = await databaseAdapter.bookingRequestAllergyRepository.findMany({
        bookingRequestId,
    });

    if (!addresses) return;

    return addresses;
}
