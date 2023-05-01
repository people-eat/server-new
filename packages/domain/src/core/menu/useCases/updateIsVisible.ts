import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        isVisible: boolean;
    };
}

export async function updateIsVisible({ dataSourceAdapter, logger, context, request }: UpdateMenuIsVisibleInput): Promise<boolean> {
    const { cookId, menuId, isVisible } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { isVisible });

    return success;
}
