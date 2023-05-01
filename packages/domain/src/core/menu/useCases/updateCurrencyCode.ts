import { Authorization, type DataSource, type Logger } from '../../..';
import { type CurrencyCode, type NanoId } from '../../shared';

export interface UpdateMenuCurrencyCodeInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        currencyCode: CurrencyCode;
    };
}

export async function updateCurrencyCode({ dataSourceAdapter, logger, context, request }: UpdateMenuCurrencyCodeInput): Promise<boolean> {
    const { cookId, menuId, currencyCode } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { currencyCode });

    return success;
}
