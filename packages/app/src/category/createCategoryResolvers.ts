import { Authorization, Service } from '@people-eat/server-domain';
import { GQLCategory, GQLCategoryMutation, GQLCategoryMutationCreateOneArgs, GQLCategoryQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createCategoryResolvers(service: Service): Resolvers<'CategoryQuery' | 'CategoryMutation' | 'Category'> {
    return {
        CategoryQuery: {
            findMany: async (
                _parent: GQLCategoryQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLCategory[] | undefined> => service.category.findMany(context, {}),
        },
        CategoryMutation: {
            createOne: async (
                _parent: GQLCategoryMutation,
                { request }: GQLCategoryMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.category.createOne(context, request),
        },
        Category: {},
    };
}
