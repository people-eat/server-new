import { Database, Logger } from '../../index.js';

export interface MealOptionService {}

export interface CreateMealOptionServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createMealOptionService({ databaseAdapter, logger }: CreateMealOptionServiceInput): MealOptionService {
    return {};
}
