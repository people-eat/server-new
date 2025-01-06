import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookMaximumParticipantsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        maximumParticipants?: number;
    };
}

export async function updateMaximumParticipants({ runtime, context, request }: UpdateCookMaximumParticipantsInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const { cookId, maximumParticipants } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { maximumParticipants });

    if (!success) return false;

    await publisher.publish(cookId, { sessionUpdates: {} });

    return true;
}
