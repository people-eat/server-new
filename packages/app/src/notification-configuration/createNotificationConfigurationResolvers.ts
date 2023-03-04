import { Authorization, Database, Logger } from '@people-eat/server-domain';
import { GQLNotificationConfiguration, GQLNotificationConfigurationQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createNotificationConfigurationResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'NotificationConfigurationQuery' | 'NotificationConfigurationMutation' | 'NotificationConfiguration'> {
    return {
        NotificationConfigurationQuery: {
            findOne: async (
                { userId }: GQLNotificationConfigurationQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLNotificationConfiguration | undefined> => undefined,
        },
        NotificationConfigurationMutation: {},
        NotificationConfiguration: {},
    };
}
