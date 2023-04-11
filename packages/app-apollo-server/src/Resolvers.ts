import { type GQLResolvers } from './generated';

export type Resolvers<K extends keyof GQLResolvers> = {
    [P in K]: GQLResolvers[P];
};
