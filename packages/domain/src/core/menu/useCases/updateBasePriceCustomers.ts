import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuBasePriceCustomersInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        basePriceCustomers: number;
    };
}

export async function updateBasePriceCustomers({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateMenuBasePriceCustomersInput): Promise<boolean> {
    const { cookId, menuId, basePriceCustomers } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { basePriceCustomers });

    return success;
}
