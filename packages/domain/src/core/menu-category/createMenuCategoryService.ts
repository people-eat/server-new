import { Database, Logger } from '../../index.js';

export interface MenuCategoryService {}

export interface CreateMenuCategoryServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createMenuCategoryService({ databaseAdapter, logger }: CreateMenuCategoryServiceInput): MenuCategoryService {
    return {};
}
