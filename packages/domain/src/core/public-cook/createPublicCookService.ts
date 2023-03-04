import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { PublicCook } from './PublicCook.js';
import { findMany } from './useCases/findMany.js';
import { findOne, FindOnePublicCookRequest } from './useCases/findOne.js';

export interface PublicCookService {
    findOne(context: Authorization.Context, request: FindOnePublicCookRequest): Promise<PublicCook | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<PublicCook[] | undefined>;
}

export interface CreatePublicCookServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createPublicCookService({ databaseAdapter, logger }: CreatePublicCookServiceInput): PublicCookService {
    return {
        findOne: (context: Authorization.Context, request: FindOnePublicCookRequest) =>
            findOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
    };
}
