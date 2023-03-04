import { Database, Logger } from '../../index.js';

export interface SearchRequestService {}

export interface CreateSearchRequestServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createSearchRequestService({ databaseAdapter, logger }: CreateSearchRequestServiceInput): SearchRequestService {
    return {};
}
