import { Database, Logger } from '../../index.js';

export interface CustomerFeeUpdateService {}

export interface CreateCustomerFeeUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCustomerFeeUpdateService({ databaseAdapter, logger }: CreateCustomerFeeUpdateServiceInput): CustomerFeeUpdateService {
    return {};
}
