import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type Menu } from '../Menu';

export interface FindManyMenusInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { cookId: NanoId };
}

export async function findMany({ dataSourceAdapter, logger, context, request }: FindManyMenusInput): Promise<Menu[] | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const menus: DataSource.DBMenu[] | undefined = await dataSourceAdapter.menuRepository.findMany({ cookId });

    if (!menus) return;

    return menus;
}
