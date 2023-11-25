import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBUser } from '../../../data-source';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type FavoriteCook } from '../FavoriteCook';

export interface FindManyMealsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findManyByUserId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindManyMealsInput): Promise<FavoriteCook[] | undefined> {
    const { userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const favoriteCooks: DataSource.DBFavoriteCook[] | undefined = await dataSourceAdapter.favoriteCookRepository.findMany({ userId });

    if (!favoriteCooks) return;

    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findMany({});

    if (!cooks) return;

    const favoritePublicCooks: FavoriteCook[] = [];

    for (const favoriteCook of favoriteCooks) {
        const cook: DataSource.DBCook | undefined = cooks.find(({ cookId }: DataSource.DBCook) => cookId === favoriteCook.cookId);

        if (!cook || !cook.isVisible || cook.isLocked) break;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });

        if (!user) break;

        favoritePublicCooks.push({
            userId,
            cookId: favoriteCook.cookId,
            createdAt: favoriteCook.createdAt,
            cook: {
                ...cook,
                user,
                location: {
                    latitude: cook.latitude,
                    longitude: cook.longitude,
                    text: cook.city,
                },
            },
        });
    }

    return favoritePublicCooks;
}
