import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLPublicTermsUpdate, type GQLPublicTermsUpdateQuery } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicTermsUpdateResolvers(service: Service): Resolvers<'PublicTermsUpdate' | 'PublicTermsUpdateQuery'> {
    return {
        PublicTermsUpdate: {},
        PublicTermsUpdateQuery: {
            findAll: async (
                _parent: GQLPublicTermsUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPublicTermsUpdate[]> => service.publicTermsUpdates.findMany(context, {}) as any,
            findLatest: async (
                _parent: GQLPublicTermsUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPublicTermsUpdate> => service.publicTermsUpdates.findLatest(context) as any,
        },
    };
}
