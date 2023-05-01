import { Authorization, type DataSource, type Language, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface FindManyCookLanguagesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function findAll({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindManyCookLanguagesInput): Promise<Language[] | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cookLanguages: DataSource.DBCookLanguage[] | undefined = await dataSourceAdapter.cookLanguageRepository.findMany({ cookId });

    if (!cookLanguages) return;

    const languages: Language[] = [];

    for (const cookLanguage of cookLanguages) {
        const language: Language | undefined = await dataSourceAdapter.languageRepository.findOne({ languageId: cookLanguage.languageId });
        if (!language) break;
        languages.push(language);
    }

    return languages;
}
