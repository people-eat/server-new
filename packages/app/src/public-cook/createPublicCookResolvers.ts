import { Authorization, Database, Logger, PublicCook } from '@people-eat/server-domain';
import { GQLPublicCook, GQLPublicCookQuery, GQLPublicCookQueryFindManyArgs, GQLPublicCookQueryFindOneArgs } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createPublicCookResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'PublicCookQuery' | 'PublicCook'> {
    return {
        PublicCookQuery: {
            findMany: async (
                _parent: GQLPublicCookQuery,
                { request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook[] | undefined> => PublicCook.findMany({ databaseAdapter, logger, context, request }),
            findOne: async (
                _parent: GQLPublicCookQuery,
                request: GQLPublicCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook | undefined> => PublicCook.findOne({ databaseAdapter, logger, context, request }),
        },
        PublicCook: {},
    };
}
