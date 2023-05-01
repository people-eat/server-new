import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuPricePerChildInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        pricePerChild?: number;
    };
}

export async function updatePricePerChild({ dataSourceAdapter, logger, context, request }: UpdateMenuPricePerChildInput): Promise<boolean> {
    const { cookId, menuId, pricePerChild } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { pricePerChild });

    return success;
}
