import { Authorization, Database, Logger } from '../../../index.js';

export interface CreateOneBookingRequestInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string; bookingRequestId: string; allergyId: string };
}

export async function createOneBookingRequestAllergy({
    databaseAdapter,
    logger,
    context,
    request: { userId, bookingRequestId, allergyId },
}: CreateOneBookingRequestInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    // TODO

    const success: boolean = await databaseAdapter.bookingRequestAllergyRepository.insertOne({
        bookingRequestId,
        allergyId,
    });

    return success;
}
