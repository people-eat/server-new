import { Authorization, Database, Logger } from '../../../index.js';
import { Menu } from '../Menu.js';

interface FindOneMenuInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOneMenuRequest;
}

export interface FindOneMenuRequest {
    cookId: string;
    menuId: string;
}

export async function findOne({
    databaseAdapter,
    logger,
    context,
    request: { cookId, menuId },
}: FindOneMenuInput): Promise<Menu | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId: cookId });

    const menu: Database.DBMenu | undefined = await databaseAdapter.menuRepository.findOne({
        cookId,
        menuId,
    });

    if (!menu) return;

    return menu;
}
