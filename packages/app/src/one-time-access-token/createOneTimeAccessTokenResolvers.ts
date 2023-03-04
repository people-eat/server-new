import { Authorization, Service } from '@people-eat/server-domain';
import { GQLOneTimeAccessToken, GQLOneTimeAccessTokenMutation, GQLOneTimeAccessTokenQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createOneTimeAccessTokenResolvers(
    service: Service,
): Resolvers<'OneTimeAccessTokenQuery' | 'OneTimeAccessTokenMutation' | 'OneTimeAccessToken'> {
    return {
        OneTimeAccessTokenQuery: {
            findMany: async (
                { userId }: GQLOneTimeAccessTokenQuery,
                _input: unknown,
                _context: Authorization.Context,
            ): Promise<GQLOneTimeAccessToken[] | undefined> => undefined,
        },
        OneTimeAccessTokenMutation: {
            createOne: async (
                { userId }: GQLOneTimeAccessTokenMutation,
                _args: unknown,
                _context: Authorization.Context,
            ): Promise<boolean> => false,
        },
        OneTimeAccessToken: {},
    };
}
