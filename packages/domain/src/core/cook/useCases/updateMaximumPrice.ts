import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookMaximumPriceInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        maximumPrice?: number;
    };
}

export async function updateMaximumPrice({ runtime, context, request }: UpdateCookMaximumPriceInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const { cookId, maximumPrice } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { maximumPrice });

    if (!success) return false;

    await publisher.publish(cookId, { sessionUpdates: {} });

    return true;
}
