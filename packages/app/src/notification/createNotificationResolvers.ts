import { Authorization, Service } from '@people-eat/server-domain';
import { GQLNotification, GQLNotificationQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createNotificationResolvers(service: Service): Resolvers<'NotificationQuery' | 'NotificationMutation' | 'Notification'> {
    return {
        NotificationQuery: {
            findMany: async (
                { userId }: GQLNotificationQuery,
                _input: unknown,
                _context: Authorization.Context,
            ): Promise<GQLNotification[] | undefined> => undefined,
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
