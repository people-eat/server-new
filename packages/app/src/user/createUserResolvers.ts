import { Authorization, Database, Email, IdentityProvider, Logger, SMS, User } from '@people-eat/server-domain';
import {
    GQLUser,
    GQLUserMutation,
    GQLUserMutationCreateOneByEmailAddressArgs,
    GQLUserMutationCreateOneByIdentityProviderArgs,
    GQLUserMutationCreateOneByPhoneNumberArgs,
    GQLUserQuery,
    GQLUserQueryFindOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createUserResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
    emailAdapter: Email.EmailAdapter,
    emailRendererAdapter: Email.EmailRendererAdapter,
    smsAdapter: SMS.Adapter,
    identityProviderAdapter: IdentityProvider.IdentityProviderAdapter,
): Resolvers<'UserQuery' | 'UserMutation' | 'User'> {
    return {
        UserQuery: {
            findMany: async (_parent: GQLUserQuery, _input: unknown, context: Authorization.Context): Promise<GQLUser[] | undefined> =>
                User.findManyUsers({ databaseAdapter, logger, context, request: { searchText: undefined } }),
            findOne: async (
                _parent: GQLUserQuery,
                { userId }: GQLUserQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLUser | undefined> => User.findOneUserByUserId({ databaseAdapter, logger, context, request: { userId } }),
        },
        UserMutation: {
            createOneByEmailAddress: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                User.createOneUserByEmailAddress({ databaseAdapter, emailAdapter, emailRendererAdapter, logger, context, request }),
            createOneByPhoneNumber: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> => User.createOneUserByPhoneNumber({ databaseAdapter, smsAdapter, logger, context, request }),
            createOneByIdentityProvider: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                User.createOneUserByIdentityProvider({ databaseAdapter, identityProviderAdapter, logger, context, request }),
        },
        User: {},
    };
}
