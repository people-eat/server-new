import { Authorization, Database, Logger } from '../../index.js';
import { Meal } from './Meal.js';

export interface FindOneMealInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: string; mealId: string };
}

export async function findOne({
    databaseAdapter,
    logger,
    context,
    request: { cookId, mealId },
}: FindOneMealInput): Promise<Meal | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId: cookId });

    const meal: Database.DBMeal | undefined = await databaseAdapter.mealRepository.findOne({
        cookId,
        mealId,
    });

    if (!meal) return;

    return meal;
}
