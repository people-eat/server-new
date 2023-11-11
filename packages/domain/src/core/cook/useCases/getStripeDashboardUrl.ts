import { Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface GetStripeDashboardUrlInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function getStripeDashboardUrl({ runtime, context, request }: GetStripeDashboardUrlInput): Promise<string | undefined> {
    const { dataSourceAdapter, paymentAdapter, logger } = runtime;
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    const [payoutMethod] = cook.payoutMethods;

    if (!payoutMethod) return;

    const { stripeAccountId } = payoutMethod;

    const dashboardUrlResult: { url: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccountDashboardUrl({
        accountId: stripeAccountId,
    });

    if (!dashboardUrlResult) return;

    const { url } = dashboardUrlResult;

    return url;
}
