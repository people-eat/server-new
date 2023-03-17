import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { FavoriteCook } from '../FavoriteCook.js';

interface findManyFavoriteCooksInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string; request: FindManyRequest };
}

export async function findMany({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: findManyFavoriteCooksInput): Promise<FavoriteCook[] | undefined> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    const favoriteCooks: Database.DBFavoriteCook[] | undefined = await databaseAdapter.favoriteCookRepository.findMany({ userId });

    return favoriteCooks;
}
