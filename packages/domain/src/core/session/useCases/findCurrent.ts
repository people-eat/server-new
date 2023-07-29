import { type Authorization, type DataSource, type Logger } from '../../..';
import { type Session } from '../Session';

export interface FindCurrentSessionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
}

export async function findCurrent({ dataSourceAdapter, context }: FindCurrentSessionInput): Promise<Session | undefined> {
    const session: DataSource.DBSession | undefined = await dataSourceAdapter.sessionRepository.findOne({ sessionId: context.sessionId });

    if (!session) return;

    return session;
}
