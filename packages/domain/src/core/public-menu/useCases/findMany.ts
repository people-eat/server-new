import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBCategory, type DBKitchen, type DBMenuCategory, type DBUser } from '../../../data-source';
import { geoDistance } from '../../../utils/geoDistance';
import packLocation from '../../packLocation';
import { type FindManyPublicMenusRequest } from '../FindManyPublicMenusRequest';
import { type PublicMenu } from '../PublicMenu';

export interface FindManyPublicMenusInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyPublicMenusRequest;
}

// eslint-disable-next-line max-statements
export async function findMany({ dataSourceAdapter, request }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findAll();

    if (!menus) return;

    const publicMenus: PublicMenu[] = [];

    for (const menu of menus) {
        if (!menu.isVisible) continue;

        const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: menu.cookId });

        if (!cook || cook.isLocked || !cook.isVisible) continue;

        // check geo distance
        if (request.location) {
            const { latitude, longitude } = cook;
            const distance: number = geoDistance({ location1: request.location, location2: { latitude, longitude } });
            if (cook.maximumTravelDistance && distance > cook.maximumTravelDistance) continue;
        }

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
