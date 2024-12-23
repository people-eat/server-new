import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookMaximumTravelDistanceInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        maximumTravelDistance?: number;
    };
}

export async function updateMaximumTravelDistance({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request,
}: UpdateCookMaximumTravelDistanceInput): Promise<boolean> {
    const { cookId, maximumTravelDistance } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { maximumTravelDistance });

    if (success) await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    return success;
}
