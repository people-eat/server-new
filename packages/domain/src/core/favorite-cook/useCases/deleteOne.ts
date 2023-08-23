import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneFavoriteCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; cookId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneFavoriteCookInput): Promise<boolean> {
    const { userId, cookId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.favoriteCookRepository.deleteOne({ userId, cookId });

    return success;
}
