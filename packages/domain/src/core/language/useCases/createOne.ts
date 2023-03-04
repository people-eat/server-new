import { Authorization, Database, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';

interface CreateOneLanguageInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneLanguageRequest;
}

export interface CreateOneLanguageRequest {
    title: string;
}

export async function createOne({ databaseAdapter, logger, context, request: { title } }: CreateOneLanguageInput): Promise<boolean> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const success: boolean = await databaseAdapter.languageRepository.insertOne({
        languageId: createNanoId(),
        title,
    });

    return success;
}
