import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLCategory, type GQLCategoryQuery } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createCategoryResolvers(service: Service): Resolvers<'Category' | 'CategoryMutation' | 'CategoryQuery'> {
    return {
        Category: {},
        CategoryMutation: {},
        CategoryQuery: {
            findAll: async (_parent: GQLCategoryQuery, _input: unknown, context: Authorization.Context): Promise<GQLCategory[]> =>
                service.category.findMany(context, {}) as any,
        },
    };
}
