import { Authorization, Database, Logger } from '../../../index.js';
import { CookLanguage } from '../CookLanguage.js';

export interface FindManyCookLanguagesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: string };
}

export async function findMany({ databaseAdapter, request: { cookId } }: FindManyCookLanguagesInput): Promise<CookLanguage[] | undefined> {
    const cookLanguages: CookLanguage[] | undefined = await databaseAdapter.cookLanguageRepository.findMany({ cookId });
    return cookLanguages;
}
