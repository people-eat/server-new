import { Database, Logger } from '../../index.js';

export interface FavoriteCookService {}

export interface CreateFavoriteCookServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createFavoriteCookService({ databaseAdapter, logger }: CreateFavoriteCookServiceInput): FavoriteCookService {
    return {};
}
