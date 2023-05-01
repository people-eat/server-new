import { type Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Category } from '../Category';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<Category[] | undefined> {
    const categories: DataSource.DBCategory[] | undefined = await dataSourceAdapter.categoryRepository.findMany({});

    if (!categories) return;

    return categories;
}
