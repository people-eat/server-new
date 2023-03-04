import { Database, Logger } from '../../index.js';

export interface OneTimeAccessTokenService {}

export interface CreateOneTimeAccessTokenServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createOneTimeAccessTokenService({
    databaseAdapter,
    logger,
}: CreateOneTimeAccessTokenServiceInput): OneTimeAccessTokenService {
    return {};
}
