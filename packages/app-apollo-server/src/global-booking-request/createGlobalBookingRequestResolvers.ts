import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCookGlobalBookingRequestQuery,
    type GQLGlobalBookingRequest,
    type GQLUserGlobalBookingRequestMutation,
    type GQLUserGlobalBookingRequestMutationCreateOneArgs,
    type GQLUserGlobalBookingRequestQuery,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createGlobalBookingRequestResolvers(
    service: Service,
): Resolvers<
    'GlobalBookingRequest' | 'CookGlobalBookingRequestQuery' | 'UserGlobalBookingRequestMutation' | 'UserGlobalBookingRequestQuery'
> {
    return {
        GlobalBookingRequest: {},
        CookGlobalBookingRequestQuery: {
            findMany: async (
                { cookId }: GQLCookGlobalBookingRequestQuery,
                _: unknown,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest[] | undefined> => service.globalBookingRequest.findManyByCookId(context, { cookId }) as any,
        },
        UserGlobalBookingRequestMutation: {
            createOne: async (
                { userId }: GQLUserGlobalBookingRequestMutation,
                { request }: GQLUserGlobalBookingRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.globalBookingRequest.createOne(context, { userId, ...request }),
        },
        UserGlobalBookingRequestQuery: {
            findMany: async (
                { userId }: GQLUserGlobalBookingRequestQuery,
                _: unknown,
                context: Authorization.Context,
            ): Promise<GQLGlobalBookingRequest[] | undefined> => service.globalBookingRequest.findManyByUserId(context, { userId }) as any,
        },
    };
}
