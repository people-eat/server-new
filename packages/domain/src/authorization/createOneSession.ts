import { Database, Logger } from '../index.js';
import createNanoId from '../utils/createNanoId.js';

export interface CreateOneSessionInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export default async function createOneSession({ databaseAdapter }: CreateOneSessionInput): Promise<string | undefined> {
    const sessionId: string = createNanoId();

    const success: boolean = await databaseAdapter.sessionRepository.insertOne({
        sessionId: sessionId,
        userId: undefined,
        title: undefined,
        platform: 'NO_INFORMATION',
        expired: false,
        lastExtendedAt: new Date(),
        createdAt: new Date(),
    });

    return success ? sessionId : undefined;
}
