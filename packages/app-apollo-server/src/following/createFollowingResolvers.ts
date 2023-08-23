import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLFollowing,
    type GQLUserFollowingMutation,
    type GQLUserFollowingMutationCreateOneArgs,
    type GQLUserFollowingMutationDeleteOneArgs,
    type GQLUserFollowingQuery,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createFollowingResolvers(
    service: Service,
): Resolvers<'Following' | 'UserFollowingQuery' | 'CookFollowingQuery' | 'UserFollowingMutation'> {
    return {
        CookFollowingQuery: {},
        Following: {},
        UserFollowingMutation: {
            createOne: async (
                { userId }: GQLUserFollowingMutation,
                { cookId }: GQLUserFollowingMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.favoriteCook.createOne(context, { userId, cookId }),
            deleteOne: async (
                { userId }: GQLUserFollowingMutation,
                { cookId }: GQLUserFollowingMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.favoriteCook.deleteOne(context, { userId, cookId }),
        },
        UserFollowingQuery: {
            findAll: async ({ userId }: GQLUserFollowingQuery, _input: unknown, context: Authorization.Context): Promise<GQLFollowing[]> =>
                service.favoriteCook.findManyByUserId(context, { userId }) as unknown as GQLFollowing[],
        },
    };
}
