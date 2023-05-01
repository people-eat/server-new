import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Meal } from '../Meal';

export interface FindOneMealInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; mealId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneMealInput): Promise<Meal | undefined> {
    const { mealId, cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const meal: DataSource.DBMeal | undefined = await dataSourceAdapter.mealRepository.findOne({ mealId, cookId });

    if (!meal) return;

    return meal;
}
