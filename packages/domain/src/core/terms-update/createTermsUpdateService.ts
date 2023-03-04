import { Database, Logger } from '../../index.js';

export interface TermsUpdateService {}

export interface CreateTermsUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createTermsUpdateService({ databaseAdapter, logger }: CreateTermsUpdateServiceInput): TermsUpdateService {
    return {};
}
