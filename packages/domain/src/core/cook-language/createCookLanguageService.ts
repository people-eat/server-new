import { Database, Logger } from '../../index.js';

export interface CookLanguageService {}

export interface CreateCookLanguageServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCookLanguageService({ databaseAdapter, logger }: CreateCookLanguageServiceInput): CookLanguageService {
    return {};
}
