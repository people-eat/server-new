import { Database, Logger } from '../../index.js';

export interface MenuVisitService {}

export interface CreateMenuVisitServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createMenuVisitService({ databaseAdapter, logger }: CreateMenuVisitServiceInput): MenuVisitService {
    return {};
}
