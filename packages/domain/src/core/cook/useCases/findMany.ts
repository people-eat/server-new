import { Authorization, Database, Logger } from '../../../index.js';
import packLocation from '../../packLocation.js';
import { FindManyRequest } from '../../shared.js';
import { Cook } from '../Cook.js';

export interface FindManyCooksInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter, logger, context }: FindManyCooksInput): Promise<Cook[] | undefined> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const cooks: Database.DBCook[] | undefined = await databaseAdapter.cookRepository.findMany({});

    if (!cooks) return;

    return cooks.map(packLocation);
}
