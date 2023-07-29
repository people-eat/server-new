import { type DataSource, type Logger } from '..';
import { createNanoId } from '../utils/createNanoId';

export interface CreateOneSessionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export default async function createOneSession({ dataSourceAdapter }: CreateOneSessionInput): Promise<string | undefined> {
    const sessionId: string = createNanoId();

    const success: boolean = await dataSourceAdapter.sessionRepository.insertOne({
        createdAt: new Date(),
        expired: false,
        lastExtendedAt: new Date(),
        platform: 'NO_INFORMATION',
        sessionId: sessionId,
        title: undefined,
        userId: undefined,
        cookieSettings: undefined,
    });

    return success ? sessionId : undefined;
}
