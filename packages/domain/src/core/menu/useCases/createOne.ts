import { Authorization, Database, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';
import { CreateOneMenuRequest } from '../CreateOneMenuRequest.js';

interface CreateOneMenuInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneMenuRequest2;
}

export type CreateOneMenuRequest2 = { cookId: string; menu: CreateOneMenuRequest };

export async function createOne({ databaseAdapter, logger, context, request }: CreateOneMenuInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId: request.cookId });

    const success: boolean = await databaseAdapter.menuRepository.insertOne({
        menuId: createNanoId(),
        cookId: request.cookId,
        ...request.menu,
        createdAt: new Date(),
    });

    return success;
}
