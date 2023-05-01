import { type Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type MenuCategory } from '../MenuCategory';

export interface FindAllMenuCategoriesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { menuId: NanoId };
}

export async function findAll({ dataSourceAdapter, request }: FindAllMenuCategoriesInput): Promise<MenuCategory[] | undefined> {
    const { menuId } = request;

    const menuCategories: DataSource.DBMenuCategory[] | undefined = await dataSourceAdapter.menuCategoryRepository.findMany({ menuId });

    if (!menuCategories) return;

    return menuCategories;
}
