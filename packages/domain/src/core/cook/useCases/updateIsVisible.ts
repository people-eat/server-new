import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        isVisible: boolean;
    };
}

export async function updateIsVisible({ dataSourceAdapter, logger, context, request }: UpdateCookIsVisibleInput): Promise<boolean> {
    const { cookId, isVisible } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { isVisible });

    return success;
}
