import { type Resolvers } from '../Resolvers';

export function createTermsUpdateResolvers(): Resolvers<'TermsUpdate' | 'TermsUpdateMutation' | 'TermsUpdateQuery'> {
    return {
        TermsUpdate: {},
        TermsUpdateMutation: {},
        TermsUpdateQuery: {},
    };
}
