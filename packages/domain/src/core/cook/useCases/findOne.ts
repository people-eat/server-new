import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import { type NanoId } from '../../shared';
import { type Cook } from '../Cook';

export interface FindOneCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneCookInput): Promise<Cook | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    return packLocation(cook);
}
