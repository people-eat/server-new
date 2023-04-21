import { type DataSource, type Logger } from '..';

export interface ExtendOneSessionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    sessionId: string;
}

export default async function extendOneSession({ dataSourceAdapter, sessionId }: ExtendOneSessionInput): Promise<boolean> {
    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { lastExtendedAt: new Date() });
    return success;
}
