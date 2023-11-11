import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type Category } from './Category';
import { type CreateOneCategoryRequest } from './CreateOneCategoryRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface CategoryService {
    findOne(context: Authorization.Context, request: { categoryId: NanoId }): Promise<Category | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Category[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneCategoryRequest): Promise<boolean>;
}

export function createCategoryService({ dataSourceAdapter, logger }: Runtime): CategoryService {
    return {
        findOne: (context: Authorization.Context, request: { categoryId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneCategoryRequest) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
