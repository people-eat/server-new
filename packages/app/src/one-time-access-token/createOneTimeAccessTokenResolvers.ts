import { Authorization, Database, Logger, OneTimeAccessToken } from '@people-eat/server-domain';
import { GQLOneTimeAccessToken, GQLOneTimeAccessTokenMutation, GQLOneTimeAccessTokenQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createOneTimeAccessTokenResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'OneTimeAccessTokenQuery' | 'OneTimeAccessTokenMutation' | 'OneTimeAccessToken'> {
    return {
        OneTimeAccessTokenQuery: {
            findMany: async (
                { userId }: GQLOneTimeAccessTokenQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLOneTimeAccessToken[] | undefined> => undefined,
        },
        OneTimeAccessTokenMutation: {
            createOne: async (
                { userId }: GQLOneTimeAccessTokenMutation,
                _args: unknown,
                context: Authorization.Context,
            ): Promise<boolean> =>
                OneTimeAccessToken.createOneOneTimeAccessToken({
                    databaseAdapter,
                    logger,
                    context,
                    request: { userId },
                }),
        },
        OneTimeAccessToken: {},
    };
}
