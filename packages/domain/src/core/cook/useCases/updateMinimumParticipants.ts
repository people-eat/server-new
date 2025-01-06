import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookMinimumParticipantsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        minimumParticipants?: number;
    };
}

export async function updateMinimumParticipants({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request,
}: UpdateCookMinimumParticipantsInput): Promise<boolean> {
    const { cookId, minimumParticipants } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { minimumParticipants });

    if (!success) return false;

    await publisher.publish(cookId, { sessionUpdates: {} });

    return true;
}
