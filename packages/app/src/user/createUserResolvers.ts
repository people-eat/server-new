import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLUser,
    GQLUserMutation,
    GQLUserMutationAddressesArgs,
    GQLUserMutationCreateOneByEmailAddressArgs,
    GQLUserMutationCreateOneByIdentityProviderArgs,
    GQLUserMutationCreateOneByPhoneNumberArgs,
    GQLUserMutationEmailAddressUpdatesArgs,
    GQLUserMutationNotificationConfigurationsArgs,
    GQLUserMutationNotificationsArgs,
    GQLUserMutationOneTimeAccessTokensArgs,
    GQLUserMutationPhoneNumberUpdatesArgs,
    GQLUserQuery,
    GQLUserQueryAddressesArgs,
    GQLUserQueryEmailAddressUpdatesArgs,
    GQLUserQueryFindOneArgs,
    GQLUserQueryNotificationConfigurationsArgs,
    GQLUserQueryNotificationsArgs,
    GQLUserQueryOneTimeAccessTokensArgs,
    GQLUserQueryPhoneNumberUpdatesArgs,
    GQLUserQuerySessionsArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createUserResolvers(service: Service): Resolvers<'UserQuery' | 'UserMutation' | 'User'> {
    return {
        UserQuery: {
            addresses: (_parent: GQLUserQuery, { userId }: GQLUserQueryAddressesArgs) => ({ userId } as any),
            notificationConfigurations: (_parent: GQLUserQuery, { userId }: GQLUserQueryNotificationConfigurationsArgs) =>
                ({ userId } as any),
            notifications: (_parent: GQLUserQuery, { userId }: GQLUserQueryNotificationsArgs) => ({ userId } as any),
            emailAddressUpdates: (_parent: GQLUserQuery, { userId }: GQLUserQueryEmailAddressUpdatesArgs) => ({ userId } as any),
            phoneNumberUpdates: (_parent: GQLUserQuery, { userId }: GQLUserQueryPhoneNumberUpdatesArgs) => ({ userId } as any),
            oneTimeAccessTokens: (_parent: GQLUserQuery, { userId }: GQLUserQueryOneTimeAccessTokensArgs) => ({ userId } as any),

            sessions: (_parent: GQLUserQuery, { userId }: GQLUserQuerySessionsArgs) => ({ userId } as any),

            findMany: async (_parent: GQLUserQuery, _input: unknown, context: Authorization.Context): Promise<GQLUser[] | undefined> =>
                service.user.findMany(context, { searchText: undefined }),

            findOne: async (
                _parent: GQLUserQuery,
                { userId }: GQLUserQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLUser | undefined> => service.user.findOneByUserId(context, { userId }),
        },
        UserMutation: {
            addresses: (_parent: GQLUserMutation, { userId }: GQLUserMutationAddressesArgs) => ({ userId } as any),
            notificationConfigurations: (_parent: GQLUserMutation, { userId }: GQLUserMutationNotificationConfigurationsArgs) =>
                ({ userId } as any),
            notifications: (_parent: GQLUserMutation, { userId }: GQLUserMutationNotificationsArgs) => ({ userId } as any),
            emailAddressUpdates: (_parent: GQLUserMutation, { userId }: GQLUserMutationEmailAddressUpdatesArgs) => ({ userId } as any),
            phoneNumberUpdates: (_parent: GQLUserMutation, { userId }: GQLUserMutationPhoneNumberUpdatesArgs) => ({ userId } as any),
            oneTimeAccessTokens: (_parent: GQLUserMutation, { userId }: GQLUserMutationOneTimeAccessTokensArgs) => ({ userId } as any),

            createOneByEmailAddress: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByEmailAddress(context, request),

            createOneByPhoneNumber: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByPhoneNumber(context, request),

            createOneByIdentityProvider: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByIdentityProvider(context, request),
        },
        User: {},
    };
}
