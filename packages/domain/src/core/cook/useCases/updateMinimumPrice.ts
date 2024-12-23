import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookMinimumPriceInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        minimumPrice?: number;
    };
}

export async function updateMinimumPrice({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request,
}: UpdateCookMinimumPriceInput): Promise<boolean> {
    const { cookId, minimumPrice } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { minimumPrice });

    if (success) await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    return success;
}
