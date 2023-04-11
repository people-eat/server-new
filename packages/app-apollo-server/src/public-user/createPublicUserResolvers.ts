import { type Resolvers } from '../Resolvers';

export function createPublicUserResolvers(): Resolvers<'PublicUser'> {
    return {
        PublicUser: {},
    };
}
