import { Database, Logger } from '../../index.js';

export interface UserRatingService {}

export interface CreateUserRatingServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createUserRatingService({ databaseAdapter, logger }: CreateUserRatingServiceInput): UserRatingService {
    return {};
}
