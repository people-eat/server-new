import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type CreateOneCookLanguageRequest } from '../CreateOneCookLanguageRequest';

export interface CreateOneCookLanguageInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCookLanguageRequest & { cookId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneCookLanguageInput): Promise<boolean> {
    const { cookId, languageId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookLanguageRepository.insertOne({ cookId, languageId });

    return success;
}
