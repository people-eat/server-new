import { Authorization, Database, Logger } from '../../../index.js';
import packLocation from '../../packLocation.js';
import { Cook } from '../Cook.js';

export interface FindOneCookInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOneCookRequest;
}

export interface FindOneCookRequest {
    cookId: string;
}

export async function findOne({ databaseAdapter, logger, context, request: { cookId } }: FindOneCookInput): Promise<Cook | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId: cookId });

    const cook: Database.DBCook | undefined = await databaseAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    return packLocation(cook);
}
