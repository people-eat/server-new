import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookMaximumPriceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        maximumPrice?: number;
    };
}

export async function updateMaximumPrice({ dataSourceAdapter, logger, context, request }: UpdateCookMaximumPriceInput): Promise<boolean> {
    const { cookId, maximumPrice } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { maximumPrice });

    return success;
}
