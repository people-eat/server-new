import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type SupportRequest } from '../SupportRequest';

export interface FindManySupportRequestsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({
    context,
    logger,
    dataSourceAdapter,
}: FindManySupportRequestsInput): Promise<SupportRequest[] | undefined> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const supportRequests: DataSource.DBSupportRequest[] | undefined = await dataSourceAdapter.supportRequestRepository.findMany({});

    if (!supportRequests) return;

    return supportRequests;
}
