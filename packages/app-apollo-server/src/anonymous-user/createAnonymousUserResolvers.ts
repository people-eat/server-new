import { type Resolvers } from '../Resolvers';

export function createAnonymousUserResolvers(): Resolvers<'AnonymousUser'> {
    return {
        AnonymousUser: {},
    };
}
