import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Cook } from './Cook.js';
import { CreateOneCookRequest } from './CreateOneCookRequest.js';
import { createOne } from './useCases/createOne.js';
import { findMany } from './useCases/findMany.js';
import { findOne, FindOneCookRequest } from './useCases/findOne.js';

export interface CookService {
    findOne(context: Authorization.Context, request: FindOneCookRequest): Promise<Cook | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Cook[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneCookRequest & { userId: string }): Promise<boolean>;
}

export interface CreateCookServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCookService({ databaseAdapter, logger }: CreateCookServiceInput): CookService {
    return {
        findOne: (context: Authorization.Context, request: FindOneCookRequest) => findOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneCookRequest & { userId: string }) =>
            createOne({ databaseAdapter, logger, context, request }),
    };
}
