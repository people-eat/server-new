import { type Resolvers } from '../Resolvers';

export function createNotificationConfigurationResolvers(): Resolvers<
    'NotificationConfiguration' | 'NotificationConfigurationMutation' | 'NotificationConfigurationQuery'
> {
    return {
        NotificationConfiguration: {},
        NotificationConfigurationMutation: {},
        NotificationConfigurationQuery: {},
    };
}
