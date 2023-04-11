import { type Resolvers } from '../Resolvers';

export function createCookSpecificFeeResolvers(): Resolvers<'CookSpecificFee' | 'CookSpecificFeeMutation' | 'CookSpecificFeeQuery'> {
    return {
        CookSpecificFee: {},
        CookSpecificFeeMutation: {},
        CookSpecificFeeQuery: {},
    };
}
