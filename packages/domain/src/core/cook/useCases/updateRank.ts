import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type CookRank, type NanoId } from '../../shared';

export interface UpdateCookRankInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        rank: CookRank;
    };
}

export async function updateRank({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request,
}: UpdateCookRankInput): Promise<boolean> {
    const { cookId, rank } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { rank });

    if (!success) return false;

    await publisher.publish(cookId, { sessionUpdates: {} });

    return true;
}
