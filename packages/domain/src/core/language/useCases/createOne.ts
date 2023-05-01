import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneLanguageRequest } from '../CreateOneLanguageRequest';

export interface CreateOneLanguageInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneLanguageRequest;
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneLanguageInput): Promise<boolean> {
    const { title } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const languageId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.languageRepository.insertOne({
        languageId,
        title,
    });

    return success;
}
