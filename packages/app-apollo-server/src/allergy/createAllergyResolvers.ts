import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLAllergy, type GQLAllergyQuery } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createAllergyResolvers(service: Service): Resolvers<'Allergy' | 'AllergyMutation' | 'AllergyQuery'> {
    return {
        Allergy: {},
        AllergyMutation: {},
        AllergyQuery: {
            findAll: async (_parent: GQLAllergyQuery, _input: unknown, context: Authorization.Context): Promise<GQLAllergy[]> =>
                service.allergy.findMany(context, {}) as any,
        },
    };
}
