import { Database, Logger } from '../../index.js';

export interface MealService {}

export interface CreateMealServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createMealService({ databaseAdapter, logger }: CreateMealServiceInput): MealService {
    return {};
}
