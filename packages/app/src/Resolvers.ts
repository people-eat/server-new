import { GQLResolvers } from './generated.js';

type NonOptional<T> = { [P in keyof T]-?: T[P] };

export type Resolvers<K extends keyof NonOptional<GQLResolvers>> = {
    [P in K]: GQLResolvers[P];
};
