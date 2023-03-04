import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Category } from './Category.js';
import { createOne, CreateOneCategoryRequest } from './useCases/createOne.js';
import { findMany } from './useCases/findMany.js';

export interface CategoryService {
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Category[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneCategoryRequest): Promise<boolean>;
}

export interface CreateCategoryServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCategoryService({ databaseAdapter, logger }: CreateCategoryServiceInput): CategoryService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneCategoryRequest) =>
            createOne({ databaseAdapter, logger, context, request }),
    };
}
