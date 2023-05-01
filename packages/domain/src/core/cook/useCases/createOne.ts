import { Authorization, type CookLanguage, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type CreateOneCookRequest } from '../CreateOneCookRequest';

export interface CreateOneCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context & { userCreation?: boolean };
    request: CreateOneCookRequest & { cookId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneCookInput): Promise<boolean> {
    const {
        cookId,
        isVisible,
        name,
        location,
        rank,
        biography,
        travelExpenses,
        maximumTravelDistance,
        minimumPrice,
        maximumPrice,
        minimumParticipants,
        maximumParticipants,
        languageIds,
    } = request;

    if (!context.userCreation) await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.insertOne({
        cookId,
        isLocked: false,
        isVisible,
        name,
        latitude: location.latitude,
        longitude: location.longitude,
        rank,
        biography: biography.trim(),
        travelExpenses,
        maximumTravelDistance,
        minimumPrice,
        maximumPrice,
        minimumParticipants,
        maximumParticipants,
        createdAt: new Date(),
    });

    if (languageIds) {
        const languageSuccess: boolean = await dataSourceAdapter.cookLanguageRepository.insertMany(
            languageIds.map((languageId: NanoId): CookLanguage => ({ languageId, cookId })),
        );

        if (!languageSuccess) return false;
    }

    return success;
}
