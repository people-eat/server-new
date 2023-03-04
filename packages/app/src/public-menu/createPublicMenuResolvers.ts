import { Authorization, Database, Logger, PublicMenu } from '@people-eat/server-domain';
import { GQLPublicMenu, GQLPublicMenuQuery, GQLPublicMenuQueryFindManyArgs, GQLPublicMenuQueryFindOneArgs } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createPublicMenuResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'PublicMenuQuery' | 'PublicMenu'> {
    return {
        PublicMenuQuery: {
            findMany: async (
                _parent: GQLPublicMenuQuery,
                { request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu[] | undefined> => PublicMenu.findMany({ databaseAdapter, logger, context, request }),
            findOne: async (
                _parent: GQLPublicMenuQuery,
                request: GQLPublicMenuQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu | undefined> => PublicMenu.findOne({ databaseAdapter, logger, context, request }),
        },
        PublicMenu: {},
    };
}
