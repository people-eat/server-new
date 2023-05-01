import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface CreateOneCookLanguageInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; languageId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: CreateOneCookLanguageInput): Promise<boolean> {
    const { cookId, languageId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookLanguageRepository.deleteOne({ cookId, languageId });

    return success;
}
