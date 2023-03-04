import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { Language } from '../Language.js';

interface FindManyLanguagesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter }: FindManyLanguagesInput): Promise<Language[] | undefined> {
    const languages: Database.DBLanguage[] | undefined = await databaseAdapter.languageRepository.findMany({});
    return languages;
}
