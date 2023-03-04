import { Database, Logger } from '../../index.js';

export interface CookRatingService {}

export interface CreateCookRatingServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCookRatingService({ databaseAdapter, logger }: CreateCookRatingServiceInput): CookRatingService {
    return {};
}
