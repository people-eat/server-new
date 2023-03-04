import { Authorization, Database, IdentityProvider, Logger, Session } from '@people-eat/server-domain';
import {
    GQLSession,
    GQLSessionMutation,
    GQLSessionMutationAssignOneByEmailAddressArgs,
    GQLSessionMutationAssignOneByIdentityProviderArgs,
    GQLSessionMutationAssignOneByPhoneNumberArgs,
    GQLSessionMutationExpireOneArgs,
    GQLSessionQuery,
    GQLSessionQueryFindManyArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createSessionResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
    identityProviderAdapter: IdentityProvider.IdentityProviderAdapter,
): Resolvers<'SessionQuery' | 'SessionMutation' | 'Session'> {
    return {
        SessionQuery: {
            findMany: async (
                _parent: GQLSessionQuery,
                request: GQLSessionQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLSession[] | undefined> => Session.findManySessions({ databaseAdapter, logger, context, request }),
        },
        SessionMutation: {
            assignOneByEmailAddress: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Session.assignOneSessionByEmailAddress({
                    databaseAdapter,
                    logger,
                    context,
                    request,
                }),
            assignOneByPhoneNumber: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Session.assignOneSessionByPhoneNumber({
                    databaseAdapter,
                    logger,
                    context,
                    request,
                }),
            assignOneByIdentityProvider: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Session.assignOneSessionByIdentityProvider({ databaseAdapter, identityProviderAdapter, logger, context, request }),
            expireOne: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationExpireOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => Session.expireOneSession({ databaseAdapter, logger, context, request }),
        },
        Session: {},
    };
}
