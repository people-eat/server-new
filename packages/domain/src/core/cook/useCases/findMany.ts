import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type Cook } from '../Cook';

export interface FindManyCooksInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ runtime, context }: FindManyCooksInput): Promise<Cook[] | undefined> {
    const { dataSourceAdapter, logger } = runtime;
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findAll();

    if (!cooks) return;

    return cooks.map(
        (cook: DataSource.DBCook): Cook => ({
            ...packLocation(cook),
            hasStripePayoutMethodActivated: cook.payoutMethods?.[0]?.active ?? false,
        }),
    );
}
