import { Authorization, Database, Logger } from '../../index.js';

export interface CreateOneCategoryInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function createOneCategory({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: CreateOneCategoryInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    return false;
}
