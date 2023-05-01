import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuPricePerAdultInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        pricePerAdult: number;
    };
}

export async function updatePricePerAdult({ dataSourceAdapter, logger, context, request }: UpdateMenuPricePerAdultInput): Promise<boolean> {
    const { cookId, menuId, pricePerAdult } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { pricePerAdult });

    return success;
}
