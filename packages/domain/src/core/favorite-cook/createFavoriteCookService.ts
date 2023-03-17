import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { FavoriteCook } from './FavoriteCook.js';
import { createOne } from './useCases/createOne.js';
import { deleteOne } from './useCases/deleteOne.js';
import { findMany } from './useCases/findMany.js';

export interface FavoriteCookService {
    findMany(context: Authorization.Context, request: { userId: string; request: FindManyRequest }): Promise<FavoriteCook[] | undefined>;
    createOne(context: Authorization.Context, request: { userId: string; cookId: string }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { userId: string; cookId: string }): Promise<boolean>;
}

export interface CreateFavoriteCookServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createFavoriteCookService({ databaseAdapter, logger }: CreateFavoriteCookServiceInput): FavoriteCookService {
    return {
        findMany: (context: Authorization.Context, request: { userId: string; request: FindManyRequest }) =>
            findMany({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: { userId: string; cookId: string }) =>
            createOne({ databaseAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { userId: string; cookId: string }) =>
            deleteOne({ databaseAdapter, logger, context, request }),
    };
}
