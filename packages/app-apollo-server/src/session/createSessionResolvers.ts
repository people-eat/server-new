import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLSessionMutation,
    type GQLSessionMutationAssignOneByEmailAddressArgs,
    type GQLSessionMutationAssignOneByIdentityProviderArgs,
    type GQLSessionMutationAssignOneByPhoneNumberArgs,
    type GQLUserSessionMutation,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createSessionResolvers(
    service: Service,
): Resolvers<'Session' | 'SessionMutation' | 'UserSessionQuery' | 'UserSessionMutation'> {
    return {
        Session: {},
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
            expireCurrent: async ({ userId }: GQLUserSessionMutation, _: unknown, context: Authorization.Context): Promise<boolean> =>
                service.session.expireOne(context, { sessionId: context.sessionId, userId }),
        },
        UserSessionQuery: {},
    };
}
