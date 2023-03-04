import { Authorization, Database, Logger } from '../../index.js';

export interface CreateOneCookSpecificFeeInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function createOneCookSpecificFee({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: CreateOneCookSpecificFeeInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    return false;
}
