import { Authorization, type DataSource, type Logger } from '../../..';
import { type CreateOneMealOptionRequest } from '../../meal-option';
import { type NanoId } from '../../shared';

export interface CreateManyMealOptionsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; courseId: NanoId; mealOptions: CreateOneMealOptionRequest[] };
}

export async function createMany({ dataSourceAdapter, logger, context, request }: CreateManyMealOptionsInput): Promise<boolean> {
    const { mealOptions, cookId, courseId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });
    const success: boolean = await dataSourceAdapter.mealOptionRepository.insertMany(
        mealOptions.map(({ mealId, index }: CreateOneMealOptionRequest) => ({
            courseId,
            index,
            cookId,
            mealId,
        })),
    );

    return success;
}
