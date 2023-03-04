import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLMenu,
    GQLMenuMutation,
    GQLMenuMutationCreateOneArgs,
    GQLMenuQuery,
    GQLMenuQueryFindManyArgs,
    GQLMenuQueryFindOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createMenuResolvers(service: Service): Resolvers<'MenuQuery' | 'MenuMutation' | 'Menu'> {
    return {
        MenuQuery: {
            findMany: (
                { cookId }: GQLMenuQuery,
                { request }: GQLMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLMenu[] | undefined> => service.menu.findMany(context, { cookId, ...request }) as any,

            findOne: async ({ cookId }: GQLMenuQuery, { menuId }: GQLMenuQueryFindOneArgs, context: Authorization.Context) =>
                service.menu.findOne(context, { cookId, menuId }) as any,
        },
        MenuMutation: {
            createOne: async (
                { cookId }: GQLMenuMutation,
                { menu }: GQLMenuMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.createOne(context, { cookId, menu }) as any,
        },
        Menu: {},
    };
}
