import { Database, Logger } from '../../index.js';

export interface CookSpecificFeeService {}

export interface CreateCookSpecificFeeServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCookSpecificFeeService({ databaseAdapter, logger }: CreateCookSpecificFeeServiceInput): CookSpecificFeeService {
    return {};
}
