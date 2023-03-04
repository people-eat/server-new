import { Authorization, Database, Logger } from '../../index.js';
import { CreateOneCookLanguageRequest } from './CreateOneCookLanguageRequest.js';

export interface CreateOneCookLanguageInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: string;
        language: CreateOneCookLanguageRequest;
    };
}

export async function createOneCookLanguage({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: CreateOneCookLanguageInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    return false;
}
