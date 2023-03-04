import { Authorization, Cook, Database, Logger } from '@people-eat/server-domain';
import {
    GQLCook,
    GQLCookMutation,
    GQLCookMutationCreateOneArgs,
    GQLCookQuery,
    GQLCookQueryFindManyArgs,
    GQLCookQueryFindOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createCookResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'CookQuery' | 'CookMutation' | 'Cook'> {
    return {
        CookQuery: {
            findMany: async (
                _parent: GQLCookQuery,
                { request }: GQLCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLCook[] | undefined> => Cook.findManyCooks({ databaseAdapter, logger, context, request }),
            findOne: async (_parent: GQLCookQuery, request: GQLCookQueryFindOneArgs, context: Authorization.Context) =>
                Cook.findOneCook({ databaseAdapter, logger, request, context }),
        },
        CookMutation: {
            createOne: async (
                _parent: GQLCookMutation,
                { cook }: GQLCookMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Cook.createOneCook({
                    databaseAdapter,
                    logger,
                    context,
                    request: { ...cook, languages: [] },
                }),
        },
        Cook: {},
    };
}
