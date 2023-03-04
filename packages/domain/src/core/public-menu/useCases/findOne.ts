import { Authorization, Database, Logger } from '../../../index.js';
import { PublicMenu } from '../PublicMenu.js';

interface FindOnePublicMenuInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOnePublicMenuRequest;
}

export interface FindOnePublicMenuRequest {
    menuId: string;
}

export async function findOne({ databaseAdapter, request }: FindOnePublicMenuInput): Promise<PublicMenu | undefined> {
    const menu: Database.DBMenu | undefined = await databaseAdapter.menuRepository.findOne({ menuId: request.menuId, isVisible: true });

    if (!menu) return;

    return menu;
}
