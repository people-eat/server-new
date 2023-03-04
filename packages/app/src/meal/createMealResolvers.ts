import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLMeal,
    GQLMealMutation,
    GQLMealMutationCreateOneArgs,
    GQLMealQuery,
    GQLMealQueryFindManyArgs,
    GQLMealQueryFindOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createMealResolvers(service: Service): Resolvers<'MealQuery' | 'MealMutation' | 'Meal'> {
    return {
        MealQuery: {
            findMany: async (
                { cookId }: GQLMealQuery,
                { request }: GQLMealQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLMeal[] | undefined> => undefined,
            findOne: async ({ cookId }: GQLMealQuery, { mealId }: GQLMealQueryFindOneArgs, context: Authorization.Context) => undefined,
        },
        MealMutation: {
            createOne: async (
                { cookId }: GQLMealMutation,
                { meal }: GQLMealMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => false,
        },
        Meal: {},
    };
}
