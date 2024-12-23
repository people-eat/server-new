import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookTravelExpensesInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        travelExpenses: number;
    };
}

export async function updateTravelExpenses({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request,
}: UpdateCookTravelExpensesInput): Promise<boolean> {
    const { cookId, travelExpenses } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { travelExpenses });

    if (success) await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    return success;
}
