import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateOneFavoriteCookRequest } from './CreateOneFavoriteCookRequest';
import { type FavoriteCook } from './FavoriteCook';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findManyByUserId } from './useCases/findManyByUserId';

export interface FavoriteCookService {
    findManyByUserId(context: Authorization.Context, request: { userId: NanoId }): Promise<FavoriteCook[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneFavoriteCookRequest & { userId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { userId: NanoId; cookId: NanoId }): Promise<boolean>;
}

export function createFavoriteCookService({ dataSourceAdapter, logger }: Runtime): FavoriteCookService {
    return {
        findManyByUserId: (context: Authorization.Context, request: { userId: NanoId }) =>
            findManyByUserId({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneFavoriteCookRequest & { userId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { userId: NanoId; cookId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
