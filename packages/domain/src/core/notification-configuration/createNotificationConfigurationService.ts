import { Database, Logger } from '../../index.js';

export interface NotificationConfigurationService {}

export interface CreateNotificationConfigurationServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createNotificationConfigurationService({
    databaseAdapter,
    logger,
}: CreateNotificationConfigurationServiceInput): NotificationConfigurationService {
    return {};
}
