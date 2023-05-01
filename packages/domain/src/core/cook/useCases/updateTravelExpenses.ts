import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookTravelExpensesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        travelExpenses: number;
    };
}

export async function updateTravelExpenses({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateCookTravelExpensesInput): Promise<boolean> {
    const { cookId, travelExpenses } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { travelExpenses });

    return success;
}
