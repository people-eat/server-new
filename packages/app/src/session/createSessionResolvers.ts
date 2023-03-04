import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLSession,
    GQLSessionMutation,
    GQLSessionMutationAssignOneByEmailAddressArgs,
    GQLSessionMutationAssignOneByIdentityProviderArgs,
    GQLSessionMutationAssignOneByPhoneNumberArgs,
    GQLSessionQuery,
    GQLUserSessionMutation,
    GQLUserSessionMutationExpireOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createSessionResolvers(
    service: Service,
): Resolvers<'SessionQuery' | 'SessionMutation' | 'UserSessionMutation' | 'Session'> {
    return {
        SessionQuery: {
            findMany: async (
                { userId }: GQLSessionQuery,
                _request: unknown,
                context: Authorization.Context,
            ): Promise<GQLSession[] | undefined> => service.session.findMany(context, { userId }),
        },
        SessionMutation: {
            assignOneByEmailAddress: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOneByEmailAddress(context, request),
            assignOneByPhoneNumber: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOneByPhoneNumber(context, request),
            assignOneByIdentityProvider: async (
                _parent: GQLSessionMutation,
                { request }: GQLSessionMutationAssignOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.assignOneByIdentityProvider(context, request),
        },
        UserSessionMutation: {
            expireOne: async (
                _parent: GQLUserSessionMutation,
                { request }: GQLUserSessionMutationExpireOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.session.expireOne(context, request),
        },
        Session: {},
    };
}
