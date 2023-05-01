import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type CreateMenuCategoryRequest } from '../CreateMenuCategoryRequest';

export interface CreateOneMenuCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateMenuCategoryRequest & { cookId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneMenuCategoryInput): Promise<boolean> {
    const { cookId, menuId, categoryId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuCategoryRepository.insertOne({ cookId, menuId, categoryId });

    return success;
}
