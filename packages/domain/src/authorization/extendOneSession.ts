import { Database, Logger } from '../index.js';

export interface ExtendOneSessionInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    sessionId: string;
}

export default async function extendOneSession({ databaseAdapter, sessionId }: ExtendOneSessionInput): Promise<boolean> {
    const success: boolean = await databaseAdapter.sessionRepository.updateOne({ sessionId }, { lastExtendedAt: new Date() });
    return success;
}
