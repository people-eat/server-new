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

const heroMenuIds: string[] = [
    'lJUrAV6brdx44zF5UNKO',
    'nL98QFBJq36s7YtIDhlV',
    'U5ydHBxaEndVNhxVaQdl',
    '5RPq3PvlS3IqajPuBBQE',
    'smtOynj2WJmZKH2VNu36',
];

// eslint-disable-next-line max-statements
export async function findHeroes({ dataSourceAdapter }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findMany({});

    if (!menus) return;

    const heroMenus: PublicMenu[] = [];

    for (const menu of menus) {
        if (!menu.isVisible || !heroMenuIds.includes(menu.menuId)) continue;

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

        heroMenus.push({
            ...menu,
            cook: { ...packLocation(cook), user },
            categories,
            kitchen,
        });
    }

    return heroMenus;
}
