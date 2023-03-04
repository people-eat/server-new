import { Database, Logger } from '../../index.js';

export interface ConfiguredMenuService {}

export interface CreateConfiguredMenuServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createConfiguredMenuService({ databaseAdapter, logger }: CreateConfiguredMenuServiceInput): ConfiguredMenuService {
    return {};
}
