import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneCategoryRequest } from '../CreateOneCategoryRequest';

export interface CreateOneCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCategoryRequest;
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneCategoryInput): Promise<boolean> {
    const { title } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const categoryId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.categoryRepository.insertOne({
        categoryId,
        title,
    });

    return success;
}
