import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Kitchen } from './Kitchen.js';
import { createOne, CreateOneKitchenRequest } from './useCases/createOne.js';
import { findMany } from './useCases/findMany.js';

export interface KitchenService {
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Kitchen[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneKitchenRequest): Promise<boolean>;
}

export interface CreateKitchenServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createKitchenService({ databaseAdapter, logger }: CreateKitchenServiceInput): KitchenService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneKitchenRequest) =>
            createOne({ databaseAdapter, logger, context, request }),
    };
}
