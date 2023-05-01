import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Session } from '../Session';

export interface FindManySessionsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManySessionsRequest;
}

export type FindManySessionsRequest = { userId: string } & FindManyRequest;

export async function findMany({
    dataSourceAdapter,
    logger,
    context,
    request: { userId },
}: FindManySessionsInput): Promise<Session[] | undefined> {
    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const sessions: DataSource.DBSession[] | undefined = await dataSourceAdapter.sessionRepository.findMany({ userId });

    if (!sessions) return;

    return sessions;
}
