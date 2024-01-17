import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLSearchRequest,
    type GQLSearchRequestMutation,
    type GQLSearchRequestMutationCreateOneArgs,
    type GQLSearchRequestQuery,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createSearchRequestResolvers(service: Service): Resolvers<'SearchRequestQuery' | 'SearchRequestMutation'> {
    return {
        SearchRequestQuery: {
            findAll: async (_parent: GQLSearchRequestQuery, _input: unknown, context: Authorization.Context): Promise<GQLSearchRequest[]> =>
                service.searchRequest.findMany(context, {}),
        },
        SearchRequestMutation: {
            createOne: async (
                _parent: GQLSearchRequestMutation,
                { request }: GQLSearchRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.searchRequest.createOne(context, request),
        },
    };
}
