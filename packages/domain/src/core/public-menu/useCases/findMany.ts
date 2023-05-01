import { type Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import { type FindManyRequest } from '../../shared';
import { type PublicMenu } from '../PublicMenu';

export interface FindManyPublicMenusInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findMany({});

    if (!menus) return;

    const publicMenus: PublicMenu[] = [];

    for (const menu of menus) {
        if (!menu.isVisible) break;

        const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: menu.cookId });

        if (!cook || cook.isLocked || !cook.isVisible) break;

        publicMenus.push({
            ...menu,
            cook: { ...packLocation(cook) },
        });
    }

    return publicMenus;
}
