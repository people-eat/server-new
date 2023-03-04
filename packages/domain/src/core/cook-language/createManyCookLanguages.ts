import { Authorization, Database, Logger } from '../../index.js';
import { CreateOneCookLanguageRequest } from './CreateOneCookLanguageRequest.js';

export interface CreateManyCookLanguageInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: string;
        languages: CreateOneCookLanguageRequest[];
    };
}

export async function createManyCookLanguage({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: CreateManyCookLanguageInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    return false;
}
