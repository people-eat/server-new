import { type Resolvers } from '../Resolvers';

export function createPrivacyPolicyUpdateResolvers(): Resolvers<
    'PrivacyPolicyUpdate' | 'PrivacyPolicyUpdateMutation' | 'PrivacyPolicyUpdateQuery'
> {
    return {
        PrivacyPolicyUpdate: {},
        PrivacyPolicyUpdateMutation: {},
        PrivacyPolicyUpdateQuery: {},
    };
}
