import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateMenuCategoryRequest } from './CreateMenuCategoryRequest';
import { type MenuCategory } from './MenuCategory';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findAll } from './useCases/findAll';

export interface MenuCategoryService {
    findAll(context: Authorization.Context, request: { menuId: NanoId }): Promise<MenuCategory[] | undefined>;
    createOne(context: Authorization.Context, request: CreateMenuCategoryRequest & { cookId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: CreateMenuCategoryRequest & { cookId: NanoId }): Promise<boolean>;
}

export function createMenuCategoryService({ dataSourceAdapter, logger }: Runtime): MenuCategoryService {
    return {
        findAll: (context: Authorization.Context, request: { menuId: NanoId }) => findAll({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateMenuCategoryRequest & { cookId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: CreateMenuCategoryRequest & { cookId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
