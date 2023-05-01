import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookMaximumParticipantsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        maximumParticipants?: number;
    };
}

export async function updateMaximumParticipants({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateCookMaximumParticipantsInput): Promise<boolean> {
    const { cookId, maximumParticipants } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { maximumParticipants });

    return success;
}
