import { Authorization, Database, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';

interface CreateOneCategoryInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCategoryRequest;
}

export interface CreateOneCategoryRequest {
    title: string;
}

export async function createOne({ databaseAdapter, logger, context, request: { title } }: CreateOneCategoryInput): Promise<boolean> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const success: boolean = await databaseAdapter.categoryRepository.insertOne({
        categoryId: createNanoId(),
        title,
    });

    return success;
}
