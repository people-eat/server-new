import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { Menu } from '../Menu.js';

interface FindManyMenusInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyMenusRequest;
}

export type FindManyMenusRequest = FindManyRequest & { cookId: string };

export async function findMany({ databaseAdapter, logger, context, request: { cookId } }: FindManyMenusInput): Promise<Menu[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId: cookId });

    const menus: Database.DBMenu[] | undefined = await databaseAdapter.menuRepository.findMany({ cookId });

    if (!menus) return;

    return menus;
}
