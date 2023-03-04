import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Session } from './Session.js';
import toSession from './toSession.js';

export interface FindManySessionsInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string } & FindManyRequest;
}

export async function findManySessions({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManySessionsInput): Promise<Session[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const sessions: Database.DBSession[] | undefined = await databaseAdapter.sessionRepository.findMany({ userId });

    if (!sessions) return;

    return sessions.map(toSession);
}
