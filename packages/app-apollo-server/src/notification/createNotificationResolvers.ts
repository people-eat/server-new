import { type Resolvers } from '../Resolvers';

export function createNotificationResolvers(): Resolvers<
    'Notification' | 'NotificationMutation' | 'NotificationQuery' | 'UserNotificationMutation'
> {
    return {
        Notification: {},
        NotificationMutation: {},
        NotificationQuery: {},
        UserNotificationMutation: {},
    };
}
