import { Authorization, Database, Logger } from '../../../index.js';
import { CreateOneCookRequest } from '../CreateOneCookRequest.js';

export interface CreateOneCookInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCookRequest & { userId: string };
}

export async function createOne({ databaseAdapter, logger, context, request }: CreateOneCookInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId: request.userId });

    const success: boolean = await databaseAdapter.cookRepository.insertOne({
        cookId: request.userId,
        isLocked: false,
        isVisible: request.isVisible,
        latitude: request.location.latitude,
        longitude: request.location.longitude,
        rank: request.rank,
        biography: request.biography,
        travelExpenses: request.travelExpenses,
        maximumTravelDistance: request.maximumTravelDistance,
        minimumPrice: request.minimumPrice,
        maximumPrice: request.maximumPrice,
        minimumParticipants: request.minimumParticipants,
        maximumParticipants: request.maximumParticipants,
        createdAt: new Date(),
    });

    return success;
}
