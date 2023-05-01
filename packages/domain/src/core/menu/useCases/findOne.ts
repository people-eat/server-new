import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Menu } from '../Menu';

export interface FindOneMenuInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; menuId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneMenuInput): Promise<Menu | undefined> {
    const { menuId, cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const menu: DataSource.DBMenu | undefined = await dataSourceAdapter.menuRepository.findOne({ menuId, cookId });

    if (!menu) return;

    return menu;
}
