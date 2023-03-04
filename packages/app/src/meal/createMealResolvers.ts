import { Authorization, Database, Logger, Meal } from '@people-eat/server-domain';
import {
    GQLMeal,
    GQLMealMutation,
    GQLMealMutationCreateOneArgs,
    GQLMealQuery,
    GQLMealQueryFindManyArgs,
    GQLMealQueryFindOneArgs,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createMealResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'MealQuery' | 'MealMutation' | 'Meal'> {
    return {
        MealQuery: {
            findMany: async (
                { cookId }: GQLMealQuery,
                { request }: GQLMealQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLMeal[] | undefined> => Meal.findMany({ databaseAdapter, logger, context, request: { cookId, ...request } }),
            findOne: async ({ cookId }: GQLMealQuery, { mealId }: GQLMealQueryFindOneArgs, context: Authorization.Context) =>
                Meal.findOne({ databaseAdapter, logger, context, request: { cookId, mealId } }),
        },
        MealMutation: {
            createOne: async (
                { cookId }: GQLMealMutation,
                { meal }: GQLMealMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Meal.createOne({
                    databaseAdapter,
                    logger,
                    context,
                    request: { cookId, meal },
                }),
        },
        Meal: {},
    };
}
