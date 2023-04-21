import { type Resolvers } from '../Resolvers';

export function createAnonymousSessionResolvers(): Resolvers<'AnonymousSession'> {
    return {
        AnonymousSession: {},
    };
}
