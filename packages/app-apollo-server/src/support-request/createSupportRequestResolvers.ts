import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLSupportRequest,
    type GQLSupportRequestQuery,
    type GQLSupportRequestQueryFindManyArgs,
    type GQLSupportRequestQueryFindOneArgs,
    type GQLUserSupportRequestMutation,
    type GQLUserSupportRequestMutationCreateOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createSupportRequestResolvers(
    service: Service,
): Resolvers<'SupportRequest' | 'SupportRequestQuery' | 'UserSupportRequestMutation'> {
    return {
        UserSupportRequestMutation: {
            createOne: async (
                { userId }: GQLUserSupportRequestMutation,
                { request }: GQLUserSupportRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.supportRequest.createOne(context, { userId, ...request }),
        },
        SupportRequestQuery: {
            findMany: async (
                _parent: GQLSupportRequestQuery,
                _input: GQLSupportRequestQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLSupportRequest[]> => service.supportRequest.findMany(context, {}) as any,
            findOne: async (
                _parent: GQLSupportRequestQuery,
                { supportRequestId }: GQLSupportRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLSupportRequest | undefined> => service.supportRequest.findOne(context, { supportRequestId }),
        },
        SupportRequest: {},
    };
}
