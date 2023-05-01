import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookMaximumTravelDistanceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        maximumTravelDistance?: number;
    };
}

export async function updateMaximumTravelDistance({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateCookMaximumTravelDistanceInput): Promise<boolean> {
    const { cookId, maximumTravelDistance } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { maximumTravelDistance });

    return success;
}
