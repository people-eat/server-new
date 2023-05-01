import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMealDescriptionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        mealId: NanoId;
        description: string;
    };
}

export async function updateDescription({ dataSourceAdapter, logger, context, request }: UpdateMealDescriptionInput): Promise<boolean> {
    const { cookId, mealId, description } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.mealRepository.updateOne({ cookId, mealId }, { description: description.trim() });

    return success;
}
