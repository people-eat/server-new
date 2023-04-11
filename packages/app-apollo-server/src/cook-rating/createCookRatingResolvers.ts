import { type Resolvers } from '../Resolvers';

export function createCookRatingResolvers(): Resolvers<'CookRating' | 'UserCookRatingQuery'> {
    return {
        CookRating: {},
        UserCookRatingQuery: {},
    };
}
