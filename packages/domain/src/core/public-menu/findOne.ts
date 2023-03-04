import { Authorization, Database, Logger } from '../../index.js';
import { PublicMenu } from './PublicMenu.js';

export interface FindOnePublicMenuInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { menuId: string };
}

export async function findOne({ databaseAdapter, logger, context, request }: FindOnePublicMenuInput): Promise<PublicMenu | undefined> {
    const menu: Database.DBMenu | undefined = await databaseAdapter.menuRepository.findOne({
        menuId: request.menuId,
        // isLocked: false,
        isVisible: true,
    });

    if (!menu) return;

    const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ userId: menu.menuId });

    if (!user) return;

    const { userId, firstName, profilePictureUrl } = user;

    return undefined;
}
