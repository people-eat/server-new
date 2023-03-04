import { Authorization, Database, Logger } from '../../../index.js';
import { CreateOneCookLanguageRequest } from '../CreateOneCookLanguageRequest.js';

export interface CreateManyCookLanguageInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: string;
        languages: CreateOneCookLanguageRequest[];
    };
}

export async function createMany({ databaseAdapter, logger, context, request }: CreateManyCookLanguageInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId: request.userId });

    const success: boolean = await databaseAdapter.cookLanguageRepository.insertMany(
        request.languages.map(({ languageId }: CreateOneCookLanguageRequest) => ({ cookId: request.userId, languageId })),
    );

    return success;
}
