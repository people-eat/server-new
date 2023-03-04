import { Authorization, Database, Logger } from '../../index.js';
import { PublicMenu } from './PublicMenu.js';

export interface FindManyPublicMenusInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { searchText?: string };
}

export async function findMany({ databaseAdapter, logger, context }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const menus: Database.DBMenu[] | undefined = await databaseAdapter.menuRepository.findMany({ isVisible: true });

    if (!menus) return;

    // for (const menu of menus) {
    //     const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ userId: menu.menuId });

    //     if (!user) break;

    //     const { userId, firstName, profilePictureUrl } = user;

    //     MenusWithUser.push({ ...packLocation(menu), user: { userId, firstName, profilePictureUrl } });
    // }

    return [];
}
