import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { PublicMenu } from './PublicMenu.js';
import { findMany } from './useCases/findMany.js';
import { findOne, FindOnePublicMenuRequest } from './useCases/findOne.js';

export interface PublicMenuService {
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<PublicMenu[] | undefined>;
    findOne(context: Authorization.Context, request: FindOnePublicMenuRequest): Promise<PublicMenu | undefined>;
}

export interface CreatePublicMenuServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createPublicMenuService({ databaseAdapter, logger }: CreatePublicMenuServiceInput): PublicMenuService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
        findOne: (context: Authorization.Context, request: FindOnePublicMenuRequest) =>
            findOne({ databaseAdapter, logger, context, request }),
    };
}
