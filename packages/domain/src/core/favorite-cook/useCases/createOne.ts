import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type CreateOneFavoriteCookRequest } from '../CreateOneFavoriteCookRequest';

export interface CreateOneFavoriteCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId } & CreateOneFavoriteCookRequest;
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneFavoriteCookInput): Promise<boolean> {
    const { userId, cookId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.favoriteCookRepository.insertOne({
        userId,
        cookId,
        createdAt: new Date(),
    });

    return success;
}
