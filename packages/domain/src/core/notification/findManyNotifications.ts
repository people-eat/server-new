import { Authorization, Database, Logger } from '../../index.js';
import { Notification } from './Notification.js';

export interface FindManyNotificationsInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function findManyNotifications({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyNotificationsInput): Promise<Notification[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const notifications: Notification[] | undefined = await databaseAdapter.notificationRepository.findMany({ userId });

    if (!notifications) return;

    return notifications;
}
