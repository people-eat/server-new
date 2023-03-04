import { Database, Logger } from '../../index.js';

export interface PublicTermsUpdateService {}

export interface CreatePublicTermsUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createPublicTermsUpdateService({ databaseAdapter, logger }: CreatePublicTermsUpdateServiceInput): PublicTermsUpdateService {
    return {};
}
