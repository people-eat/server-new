import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Category } from '../Category';

export interface FindOneCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { categoryId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneCategoryInput): Promise<Category | undefined> {
    const { categoryId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const category: DataSource.DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({ categoryId });

    if (!category) return;

    return category;
}
