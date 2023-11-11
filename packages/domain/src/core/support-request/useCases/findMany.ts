import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBSupportRequest } from '../../../data-source';
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

    const supportRequests: DBSupportRequest[] | undefined = await dataSourceAdapter.supportRequestRepository.findMany({});

    if (!supportRequests) return;

    supportRequests.sort((a: DBSupportRequest, b: DBSupportRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return supportRequests;
}
