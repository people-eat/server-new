import { Authorization, type DataSource, type Logger } from '../../..';

export interface ExpireOneSessionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: ExpireOneSessionRequest;
}

export interface ExpireOneSessionRequest {
    userId: string;
    sessionId: string;
}

export async function expireOne({
    dataSourceAdapter,
    logger,
    context,
    request: { userId, sessionId },
}: ExpireOneSessionInput): Promise<boolean> {
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne({ sessionId, userId }, { expired: true });

    return success;
}
