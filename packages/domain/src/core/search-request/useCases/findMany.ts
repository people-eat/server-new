import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type SearchRequest } from '../SearchRequest';

export interface FindManySearchRequestsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter, logger, context }: FindManySearchRequestsInput): Promise<SearchRequest[]> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const searchRequests: DataSource.DBSearchRequest[] | undefined = await dataSourceAdapter.searchRequestRepository.findMany({});

    if (!searchRequests) return [];

    return searchRequests;
}
