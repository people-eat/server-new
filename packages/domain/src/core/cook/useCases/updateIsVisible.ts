import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        isVisible: boolean;
    };
}

export async function updateIsVisible({ runtime, context, request }: UpdateCookIsVisibleInput): Promise<boolean> {
    const { dataSourceAdapter, logger } = runtime;
    const { cookId, isVisible } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { isVisible });

    return success;
}
