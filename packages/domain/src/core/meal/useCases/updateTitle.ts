import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMealTitleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        mealId: NanoId;
        title: string;
    };
}

export async function updateTitle({ dataSourceAdapter, logger, context, request }: UpdateMealTitleInput): Promise<boolean> {
    const { cookId, mealId, title } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.mealRepository.updateOne({ cookId, mealId }, { title: title.trim() });

    return success;
}
