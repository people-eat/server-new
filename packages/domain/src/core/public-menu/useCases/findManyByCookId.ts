import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBCategory, type DBKitchen, type DBMenuCategory, type DBUser } from '../../../data-source';
import packLocation from '../../packLocation';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type PublicMenu } from '../PublicMenu';

export interface FindManyPublicMenusInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { cookId: NanoId };
}

// eslint-disable-next-line max-statements
export async function findManyByCookId({ dataSourceAdapter, request }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const { cookId } = request;

    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findMany({ cookId });

    if (!menus) return;

    const publicMenus: PublicMenu[] = [];

    for (const menu of menus) {
        if (!menu.isVisible) break;

        const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: menu.cookId });

        if (!cook || cook.isLocked || !cook.isVisible) break;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: menu.cookId });

        if (!user) break;

        const menuCategories: DBMenuCategory[] | undefined = await dataSourceAdapter.menuCategoryRepository.findMany({
            menuId: menu.menuId,
        });

        if (!menuCategories) break;

        const categories: DBCategory[] = [];

        for (const menuCategory of menuCategories) {
            const category: DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({
                categoryId: menuCategory.categoryId,
            });
            if (!category) break;
            categories.push(category);
        }

        let kitchen: DBKitchen | undefined;

        if (menu.kitchenId) kitchen = await dataSourceAdapter.kitchenRepository.findOne({ kitchenId: menu?.kitchenId });

        publicMenus.push({
            ...menu,
            cook: { ...packLocation(cook), user },
            categories,
            kitchen,
        });
    }

    return publicMenus;
}
