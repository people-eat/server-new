import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookMinimumPriceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        minimumPrice?: number;
    };
}

export async function updateMinimumPrice({ dataSourceAdapter, logger, context, request }: UpdateCookMinimumPriceInput): Promise<boolean> {
    const { cookId, minimumPrice } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { minimumPrice });

    return success;
}
