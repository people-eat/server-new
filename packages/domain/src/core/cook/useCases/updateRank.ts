import { Authorization, type DataSource, type Logger } from '../../..';
import { type CookRank, type NanoId } from '../../shared';

export interface UpdateCookRankInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        rank: CookRank;
    };
}

export async function updateRank({ dataSourceAdapter, logger, context, request }: UpdateCookRankInput): Promise<boolean> {
    const { cookId, rank } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { rank });

    return success;
}
