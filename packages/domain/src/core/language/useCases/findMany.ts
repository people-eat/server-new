import { type Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Language } from '../Language';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<Language[] | undefined> {
    const languages: DataSource.DBLanguage[] | undefined = await dataSourceAdapter.languageRepository.findAll();

    if (!languages) return;

    return languages;
}
