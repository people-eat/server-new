import { Authorization, Database, Logger, Menu } from '@people-eat/server-domain';
import {
    GQLMenu,
    GQLMenuMutation,
    GQLMenuMutationCreateOneArgs,
    GQLMenuQuery,
    GQLMenuQueryFindManyArgs,
    GQLMenuQueryFindOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createMenuResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'MenuQuery' | 'MenuMutation' | 'Menu'> {
    return {
        MenuQuery: {
            findMany: async (
                { cookId }: GQLMenuQuery,
                { request }: GQLMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLMenu[] | undefined> => Menu.findMany({ databaseAdapter, logger, context, request: { cookId, ...request } }),
            findOne: async ({ cookId }: GQLMenuQuery, { menuId }: GQLMenuQueryFindOneArgs, context: Authorization.Context) =>
                Menu.findOne({ databaseAdapter, logger, context, request: { cookId, menuId } }),
        },
        MenuMutation: {
            createOne: async (
                { cookId }: GQLMenuMutation,
                { menu }: GQLMenuMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Menu.createOne({
                    databaseAdapter,
                    logger,
                    context,
                    request: { cookId, menu },
                }),
        },
        Menu: {},
    };
}
