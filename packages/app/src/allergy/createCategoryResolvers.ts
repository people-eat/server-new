import { Authorization, Service } from '@people-eat/server-domain';
import { GQLAllergy, GQLAllergyMutation, GQLAllergyMutationCreateOneArgs, GQLAllergyQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createAllergyResolvers(service: Service): Resolvers<'AllergyQuery' | 'AllergyMutation' | 'Allergy'> {
    return {
        AllergyQuery: {
            findMany: async (
                _parent: GQLAllergyQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLAllergy[] | undefined> => service.allergy.findMany(context, {}),
        },
        AllergyMutation: {
            createOne: async (
                _parent: GQLAllergyMutation,
                { request }: GQLAllergyMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.allergy.createOne(context, request),
        },
        Allergy: {},
    };
}
