import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookIsLockedInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        isLocked: boolean;
    };
}

export async function updateIsLocked({ runtime, context, request }: UpdateCookIsLockedInput): Promise<boolean> {
    const { dataSourceAdapter, logger } = runtime;
    const { cookId, isLocked } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { isLocked });

    return success;
}
