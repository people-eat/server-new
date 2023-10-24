import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBCategory, type DBKitchen, type DBMenuCategory, type DBUser } from '../../../data-source';
import packLocation from '../../packLocation';
import { type FindManyRequest } from '../../shared';
import { type PublicMenu } from '../PublicMenu';

export interface FindManyPublicMenusInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

// eslint-disable-next-line max-statements
export async function findMany({ dataSourceAdapter }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findMany({});

    if (!menus) return;

    const publicMenus: PublicMenu[] = [];

    for (const menu of menus) {
        if (!menu.isVisible) continue;

        const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: menu.cookId });

        if (!cook || cook.isLocked || !cook.isVisible) continue;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: menu.cookId });

        if (!user) continue;

        const menuCategories: DBMenuCategory[] | undefined = await dataSourceAdapter.menuCategoryRepository.findMany({
            menuId: menu.menuId,
        });

        if (!menuCategories) continue;

        const categories: DBCategory[] = [];

        for (const menuCategory of menuCategories) {
            const category: DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({
                categoryId: menuCategory.categoryId,
            });
            if (!category) continue;
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
