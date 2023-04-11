import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCookMealMutation,
    type GQLCookMealMutationCreateOneArgs,
    type GQLCookMealMutationDeleteOneArgs,
    type GQLCookMealMutationUpdateDescriptionArgs,
    type GQLCookMealMutationUpdateImageArgs,
    type GQLCookMealMutationUpdateTitleArgs,
    type GQLCookMealMutationUpdateTypeArgs,
    type GQLCookMealQuery,
    type GQLCookMealQueryFindManyArgs,
    type GQLCookMealQueryFindOneArgs,
    type GQLMeal,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createMealResolvers(service: Service): Resolvers<'Meal' | 'CookMealMutation' | 'CookMealQuery'> {
    return {
        CookMealMutation: {
            createOne: async (
                { cookId }: GQLCookMealMutation,
                { meal, image }: GQLCookMealMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.meal.createOne(context, { cookId, meal, image: image && (await image).createReadStream() }),
            deleteOne: async (
                { cookId }: GQLCookMealMutation,
                { mealId }: GQLCookMealMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.meal.deleteOne(context, { cookId, mealId }),
            updateTitle: async (
                { cookId }: GQLCookMealMutation,
                request: GQLCookMealMutationUpdateTitleArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.meal.updateTitle(context, { cookId, ...request }),
            updateDescription: async (
                { cookId }: GQLCookMealMutation,
                request: GQLCookMealMutationUpdateDescriptionArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.meal.updateDescription(context, { cookId, ...request }),
            updateImage: async (
                { cookId }: GQLCookMealMutation,
                { mealId, image }: GQLCookMealMutationUpdateImageArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                service.meal.updateImage(context, {
                    cookId,
                    mealId,
                    image: image && (await image).createReadStream(),
                }),
            updateType: async (
                { cookId }: GQLCookMealMutation,
                request: GQLCookMealMutationUpdateTypeArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.meal.updateType(context, { cookId, ...request }),
        },
        CookMealQuery: {
            findMany: async (
                { cookId }: GQLCookMealQuery,
                _input: GQLCookMealQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLMeal[]> => service.meal.findMany(context, { cookId }) as any,
            findOne: async (
                { cookId }: GQLCookMealQuery,
                { mealId }: GQLCookMealQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLMeal | undefined> => service.meal.findOne(context, { cookId, mealId }),
        },
        Meal: {},
    };
}
