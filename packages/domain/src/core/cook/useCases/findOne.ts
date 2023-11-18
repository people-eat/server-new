import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type Cook } from '../Cook';

export interface FindOneCookInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function findOne({ runtime, context, request }: FindOneCookInput): Promise<Cook | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    return { ...packLocation(cook), hasStripePayoutMethodActivated: cook.payoutMethods?.[0]?.active ?? false };
}
