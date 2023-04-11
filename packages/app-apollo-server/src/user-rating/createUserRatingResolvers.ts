import { type Resolvers } from '../Resolvers';

export function createUserRatingResolvers(): Resolvers<'UserRating' | 'UserUserRatingQuery'> {
    return {
        UserRating: {},
        UserUserRatingQuery: {},
    };
}
