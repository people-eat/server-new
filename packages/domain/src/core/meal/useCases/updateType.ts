import { Authorization, type DataSource, type Logger } from '../../..';
import { type MealType, type NanoId } from '../../shared';

export interface UpdateMealTypeInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        mealId: NanoId;
        type: MealType;
    };
}

export async function updateType({ dataSourceAdapter, logger, context, request }: UpdateMealTypeInput): Promise<boolean> {
    const { cookId, mealId, type } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.mealRepository.updateOne({ cookId, mealId }, { type });

    return success;
}
