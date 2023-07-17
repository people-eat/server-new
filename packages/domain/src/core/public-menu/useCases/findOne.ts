import { type Authorization, type DataSource, type Logger, type PublicMenu } from '../../..';
import { type DBUser } from '../../../data-source';
import packLocation from '../../packLocation';
import { type NanoId } from '../../shared';

export interface FindOnePublicCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { menuId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOnePublicCookInput): Promise<PublicMenu | undefined> {
    const { menuId } = request;

    const menu: DataSource.DBMenu | undefined = await dataSourceAdapter.menuRepository.findOne({ menuId });

    if (!menu) return;

    if (!menu.isVisible) return;

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: menu.cookId });

    if (!cook || cook.isLocked || !cook.isVisible) return;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: menu.cookId });

    if (!user) return;

    return {
        ...menu,
        cook: { ...packLocation(cook), user },
        kitchen: undefined,
        categories: [],
    };
}
