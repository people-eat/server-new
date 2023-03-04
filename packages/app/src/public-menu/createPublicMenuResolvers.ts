import { Authorization, Service } from '@people-eat/server-domain';
import { GQLPublicMenu, GQLPublicMenuQuery, GQLPublicMenuQueryFindManyArgs, GQLPublicMenuQueryFindOneArgs } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createPublicMenuResolvers(service: Service): Resolvers<'PublicMenuQuery' | 'PublicMenu'> {
    return {
        PublicMenuQuery: {
            findMany: async (
                _parent: GQLPublicMenuQuery,
                { request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu[] | undefined> => service.publicMenu.findMany(context, request) as any,
            findOne: async (
                _parent: GQLPublicMenuQuery,
                request: GQLPublicMenuQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu | undefined> => service.publicMenu.findOne(context, request) as any,
        },
        PublicMenu: {},
    };
}
