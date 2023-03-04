import { Authorization, Database, Logger } from '../../index.js';
import { Meal } from './Meal.js';

export interface FindManyMealsInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: string; searchText?: string };
}

export async function findMany({ databaseAdapter, logger, context, request: { cookId } }: FindManyMealsInput): Promise<Meal[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId: cookId });

    const Meals: Database.DBMeal[] | undefined = await databaseAdapter.mealRepository.findMany({ cookId });

    if (!Meals) return;

    return Meals;
}
