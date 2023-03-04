import { Authorization, Database, Logger } from '../../index.js';
import { Menu } from './Menu.js';

export interface FindManyMenusInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: string; searchText?: string };
}

export async function findMany({ databaseAdapter, logger, context, request: { cookId } }: FindManyMenusInput): Promise<Menu[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId: cookId });

    const menus: Database.DBMenu[] | undefined = await databaseAdapter.menuRepository.findMany({ cookId });

    if (!menus) return;

    return menus;
}
