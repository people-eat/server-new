import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuKitchenIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        kitchenId?: string;
    };
}

export async function updateKitchenId({ dataSourceAdapter, logger, context, request }: UpdateMenuKitchenIdInput): Promise<boolean> {
    const { cookId, menuId, kitchenId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { kitchenId });

    return success;
}
