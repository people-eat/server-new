import { Authorization, Database, Logger, Notification } from '@people-eat/server-domain';
import { GQLNotification, GQLNotificationQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createNotificationResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'NotificationQuery' | 'NotificationMutation' | 'Notification'> {
    return {
        NotificationQuery: {
            findMany: async (
                { userId }: GQLNotificationQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLNotification[] | undefined> =>
                Notification.findManyNotifications({ databaseAdapter, logger, context, request: { userId } }),
        },
        NotificationMutation: {
            // createOne: async (
            //     { userId }: GQLNotificationMutation,
            //     { Notification }: GQLNotificationMutationCreateOneArgs,
            //     context: Context,
            // ): Promise<boolean> =>
            //     createOneNotification({
            //         databaseAdapter,
            //         logger,
            //         context,
            //         request: { userId, Notification },
            //     }),
        },
        Notification: {},
    };
}
