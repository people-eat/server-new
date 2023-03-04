import { Database, Logger } from '../../index.js';

export interface NotificationService {}

export interface CreateNotificationServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createNotificationService({ databaseAdapter, logger }: CreateNotificationServiceInput): NotificationService {
    return {};
}
