import { Authorization, Database, Logger } from '../../../index.js';
import packLocation from '../../packLocation.js';
import { PublicCook } from '../PublicCook.js';

interface FindOnePublicCookInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOnePublicCookRequest;
}

export interface FindOnePublicCookRequest {
    cookId: string;
}

export async function findOne({ databaseAdapter, request }: FindOnePublicCookInput): Promise<PublicCook | undefined> {
    const cook: Database.DBCook | undefined = await databaseAdapter.cookRepository.findOne({
        cookId: request.cookId,
        isLocked: false,
        isVisible: true,
    });

    if (!cook) return;

    return packLocation(cook);
}
