import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type Meal } from '../Meal';

export interface FindManyMealsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { cookId: NanoId };
}

export async function findMany({ dataSourceAdapter, logger, context, request }: FindManyMealsInput): Promise<Meal[] | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const meals: DataSource.DBMeal[] | undefined = await dataSourceAdapter.mealRepository.findMany({ cookId });

    if (!meals) return;

    return meals;
}
