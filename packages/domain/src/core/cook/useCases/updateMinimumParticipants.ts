import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookMinimumParticipantsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        minimumParticipants?: number;
    };
}

export async function updateMinimumParticipants({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateCookMinimumParticipantsInput): Promise<boolean> {
    const { cookId, minimumParticipants } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { minimumParticipants });

    return success;
}
