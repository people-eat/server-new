import { Authorization, type DataSource, type Logger } from '../../..';
import { type CreateOneMealOptionRequest } from '../../meal-option';
import { type NanoId } from '../../shared';

export interface CreateOneMealOptionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneMealOptionRequest & { cookId: NanoId; courseId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneMealOptionInput): Promise<boolean> {
    const { index, mealId, cookId, courseId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });
    const success: boolean = await dataSourceAdapter.mealOptionRepository.insertOne({
        courseId,
        cookId,
        index,
        mealId,
    });

    return success;
}
