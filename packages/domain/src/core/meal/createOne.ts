import { Authorization, Database, Logger } from '../../index.js';
import createNanoId from '../../utils/createNanoId.js';
import { CreateOneMealRequest } from './CreateOneMealRequest.js';

export interface CreateOneMealInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: string; meal: CreateOneMealRequest };
}

export async function createOne({ databaseAdapter, logger, context, request }: CreateOneMealInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId: request.cookId });

    const success: boolean = await databaseAdapter.mealRepository.insertOne({
        mealId: createNanoId(),
        cookId: request.cookId,
        ...request.meal,
        createdAt: new Date(),
    });

    return success;
}
