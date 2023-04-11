import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCookMenuCourseMealOptionMutation,
    type GQLCookMenuCourseMealOptionMutationCreateManyArgs,
    type GQLCookMenuCourseMealOptionMutationCreateOneArgs,
    type GQLCookMenuCourseMealOptionMutationDeleteOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createMealOptionResolvers(
    service: Service,
): Resolvers<'MealOption' | 'CookMenuCourseMealOptionMutation' | 'CookMenuCourseMealOptionQuery'> {
    return {
        MealOption: {},
        CookMenuCourseMealOptionMutation: {
            createOne: async (
                { cookId, courseId }: GQLCookMenuCourseMealOptionMutation,
                { mealOption }: GQLCookMenuCourseMealOptionMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.mealOption.createOne(context, { cookId, courseId, ...mealOption }),
            createMany: async (
                { cookId, courseId }: GQLCookMenuCourseMealOptionMutation,
                { mealOptions }: GQLCookMenuCourseMealOptionMutationCreateManyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.mealOption.createMany(context, { cookId, courseId, mealOptions }),
            deleteOne: async (
                { cookId, courseId }: GQLCookMenuCourseMealOptionMutation,
                { mealId }: GQLCookMenuCourseMealOptionMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.mealOption.deleteOne(context, { cookId, courseId, mealId }),
        },
        CookMenuCourseMealOptionQuery: {},
    };
}
