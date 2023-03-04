import { Authorization, Database, Logger } from '../../../index.js';

export interface ExpireOneSessionInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: ExpireOneSessionRequest;
}

export interface ExpireOneSessionRequest {
    userId: string;
    sessionId: string;
}

export async function expireOne({
    databaseAdapter,
    logger,
    context,
    request: { userId, sessionId },
}: ExpireOneSessionInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    const success: boolean = await databaseAdapter.sessionRepository.updateOne({ sessionId, userId }, { expired: true });

    return success;
}
