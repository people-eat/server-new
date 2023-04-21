import { type Resolvers } from '../Resolvers';

export function createOneTimeAccessTokenResolvers(): Resolvers<
    'OneTimeAccessToken' | 'UserOneTimeAccessTokenQuery' | 'UserOneTimeAccessTokenMutation'
> {
    return {
        OneTimeAccessToken: {},
        UserOneTimeAccessTokenMutation: {},
        UserOneTimeAccessTokenQuery: {},
    };
}
