import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { PublicMenu } from '../PublicMenu.js';

interface FindManyPublicMenusInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter }: FindManyPublicMenusInput): Promise<PublicMenu[] | undefined> {
    const menus: Database.DBMenu[] | undefined = await databaseAdapter.menuRepository.findMany({ isVisible: true });

    if (!menus) return;

    return menus;
}
