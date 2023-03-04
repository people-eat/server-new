import { Authorization, Database, Logger } from '../../../index.js';
import { CreateOneCookLanguageRequest } from '../CreateOneCookLanguageRequest.js';

interface CreateOneCookLanguageInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: string;
        language: CreateOneCookLanguageRequest;
    };
}

export async function createOne({ databaseAdapter, logger, context, request }: CreateOneCookLanguageInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId: request.userId });

    const success: boolean = await databaseAdapter.cookLanguageRepository.insertOne({
        cookId: request.userId,
        languageId: request.language.languageId,
    });

    return success;
}
