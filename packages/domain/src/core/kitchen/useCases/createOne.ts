import { Authorization, Database, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';

interface CreateOneKitchenInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneKitchenRequest;
}

export interface CreateOneKitchenRequest {
    title: string;
}

export async function createOne({ databaseAdapter, logger, context, request: { title } }: CreateOneKitchenInput): Promise<boolean> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const success: boolean = await databaseAdapter.kitchenRepository.insertOne({
        kitchenId: createNanoId(),
        title,
    });

    return success;
}
