import { Authorization, Database, Logger } from '../../index.js';
import { Menu } from './Menu.js';
import { createOne, CreateOneMenuRequest2 } from './useCases/createOne.js';
import { findMany, FindManyMenusRequest } from './useCases/findMany.js';
import { findOne, FindOneMenuRequest } from './useCases/findOne.js';

export interface MenuService {
    findOne(context: Authorization.Context, request: FindOneMenuRequest): Promise<Menu | undefined>;
    findMany(context: Authorization.Context, request: FindManyMenusRequest): Promise<Menu[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneMenuRequest2): Promise<boolean>;
}

export interface CreateMenuServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createMenuService({ databaseAdapter, logger }: CreateMenuServiceInput): MenuService {
    return {
        findOne: (context: Authorization.Context, request: FindOneMenuRequest) => findOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyMenusRequest) =>
            findMany({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneMenuRequest2) =>
            createOne({ databaseAdapter, logger, context, request }),
    };
}
