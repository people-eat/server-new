import { type Resolvers } from '../Resolvers';

export function createAdminResolvers(): Resolvers<'Following' | 'UserFollowingQuery' | 'CookFollowingQuery' | 'UserFollowingMutation'> {
    return {
        CookFollowingQuery: {},
        Following: {},
        UserFollowingMutation: {},
        UserFollowingQuery: {},
    };
}
