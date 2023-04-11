import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLPublicPrivacyPolicyUpdate, type GQLPublicPrivacyPolicyUpdateQuery } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicPrivacyPolicyUpdateResolvers(
    service: Service,
): Resolvers<'PublicPrivacyPolicyUpdate' | 'PublicPrivacyPolicyUpdateQuery'> {
    return {
        PublicPrivacyPolicyUpdate: {},
        PublicPrivacyPolicyUpdateQuery: {
            findAll: async (
                _parent: GQLPublicPrivacyPolicyUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPublicPrivacyPolicyUpdate[]> => service.publicPrivacyPolicyUpdates.findMany(context, {}) as any,
            findLatest: async (
                _parent: GQLPublicPrivacyPolicyUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPublicPrivacyPolicyUpdate> => service.publicPrivacyPolicyUpdates.findLatest(context) as any,
        },
    };
}
