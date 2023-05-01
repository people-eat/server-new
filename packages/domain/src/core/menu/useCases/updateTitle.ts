import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuTitleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        title: string;
    };
}

export async function updateTitle({ dataSourceAdapter, logger, context, request }: UpdateMenuTitleInput): Promise<boolean> {
    const { cookId, menuId, title } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { title: title.trim() });

    return success;
}
