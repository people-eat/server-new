import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { Category } from '../Category.js';

interface FindManyCategoriesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter }: FindManyCategoriesInput): Promise<Category[] | undefined> {
    const categories: Database.DBCategory[] | undefined = await databaseAdapter.categoryRepository.findMany({});
    return categories;
}
