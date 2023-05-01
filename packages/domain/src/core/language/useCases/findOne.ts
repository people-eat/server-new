import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Language } from '../Language';

export interface FindOneLanguageInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { languageId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneLanguageInput): Promise<Language | undefined> {
    const { languageId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const language: DataSource.DBLanguage | undefined = await dataSourceAdapter.languageRepository.findOne({ languageId });

    if (!language) return;

    return language;
}
