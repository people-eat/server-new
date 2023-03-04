import { Authorization, Database, Logger, SMS } from '../../../index.js';

interface CreateOnePhoneNumberUpdateInput {
    databaseAdapter: Database.Adapter;
    smsAdapter: SMS.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context & { userCreation?: boolean };
    request: CreateOnePhoneNumberUpdateRequest;
}

export interface CreateOnePhoneNumberUpdateRequest {
    userId: string;
    phoneNumber: string;
}

export async function createOne({
    databaseAdapter,
    smsAdapter,
    logger,
    context,
    request: { userId, phoneNumber },
}: CreateOnePhoneNumberUpdateInput): Promise<boolean> {
    if (!context.userCreation) await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    const success: boolean = await smsAdapter.send(phoneNumber, 'Verify your phone number');

    return success;
}
