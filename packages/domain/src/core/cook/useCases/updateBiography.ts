import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookBiographyInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        biography: string;
    };
}

export async function updateBiography({ runtime, context, request }: UpdateCookBiographyInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const { cookId, biography } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { biography: biography.trim() });

    if (success) await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    return success;
}
