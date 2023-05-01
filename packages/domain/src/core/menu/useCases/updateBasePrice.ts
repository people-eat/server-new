import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuBasePriceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        basePrice: number;
    };
}

export async function updateBasePrice({ dataSourceAdapter, logger, context, request }: UpdateMenuBasePriceInput): Promise<boolean> {
    const { cookId, menuId, basePrice } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { basePrice });

    return success;
}
