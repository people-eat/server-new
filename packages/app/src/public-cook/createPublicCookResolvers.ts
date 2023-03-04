import { Authorization, Service } from '@people-eat/server-domain';
import { GQLPublicCook, GQLPublicCookQuery, GQLPublicCookQueryFindManyArgs, GQLPublicCookQueryFindOneArgs } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createPublicCookResolvers(service: Service): Resolvers<'PublicCookQuery' | 'PublicCook'> {
    return {
        PublicCookQuery: {
            findMany: async (
                _parent: GQLPublicCookQuery,
                { request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook[] | undefined> => service.publicCook.findMany(context, request) as any,
            findOne: async (
                _parent: GQLPublicCookQuery,
                request: GQLPublicCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook | undefined> => service.publicCook.findOne(context, request) as any,
        },
        PublicCook: {
            user: ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context) =>
                service.publicUser.findOne(context, { userId: cookId }) as any,
        },
    };
}
