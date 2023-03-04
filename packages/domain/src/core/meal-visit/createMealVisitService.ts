import { Database, Logger } from '../../index.js';

export interface MealVisitService {}

export interface CreateMealVisitServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createMealVisitService({ databaseAdapter, logger }: CreateMealVisitServiceInput): MealVisitService {
    return {};
}
