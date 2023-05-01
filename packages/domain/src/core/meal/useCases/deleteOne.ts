import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneMealInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; mealId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneMealInput): Promise<boolean> {
    const { cookId, mealId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.mealRepository.deleteOne({ mealId, cookId });

    return success;
}
