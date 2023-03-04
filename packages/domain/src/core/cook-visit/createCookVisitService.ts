import { Database, Logger } from '../../index.js';

export interface CookVisitService {}

export interface CreateCookVisitServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCookVisitService({ databaseAdapter, logger }: CreateCookVisitServiceInput): CookVisitService {
    return {};
}
