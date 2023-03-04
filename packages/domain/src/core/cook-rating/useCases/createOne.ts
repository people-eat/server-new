import { Authorization, Database, Logger } from '../../../index.js';

export interface CreateOneCookRatingInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function createOneCookRating({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: CreateOneCookRatingInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    return false;
}
