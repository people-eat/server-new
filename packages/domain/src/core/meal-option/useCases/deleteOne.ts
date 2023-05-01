import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneMealOptionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; courseId: NanoId; mealId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneMealOptionInput): Promise<boolean> {
    const { cookId, courseId, mealId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.mealOptionRepository.deleteOne({ cookId, courseId, mealId });

    return success;
}
