import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import { type FindManyRequest } from '../../shared';
import { type Cook } from '../Cook';

export interface FindManyCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter, logger, context }: FindManyCooksInput): Promise<Cook[] | undefined> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findMany({});

    if (!cooks) return;

    return cooks.map(packLocation);
}
