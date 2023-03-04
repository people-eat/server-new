import { Authorization, Database, Logger } from '../../../index.js';
import packLocation from '../../packLocation.js';
import { FindManyRequest } from '../../shared.js';
import { PublicCook } from '../PublicCook.js';

interface FindManyPublicCooksInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter }: FindManyPublicCooksInput): Promise<PublicCook[] | undefined> {
    const cooks: Database.DBCook[] | undefined = await databaseAdapter.cookRepository.findMany({ isLocked: false, isVisible: true });

    if (!cooks) return;

    return cooks.map(packLocation);
}
