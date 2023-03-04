import { Authorization, Database, Logger } from '../../index.js';

export interface CreateOneNotificationInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: string;
        message: string;
        url?: string;
    };
}

export async function createOneNotification({
    databaseAdapter,
    logger,
    context,
    request: { userId, message, url },
}: CreateOneNotificationInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    return false;
}
