import { Authorization, type DataSource, type Logger, type PaymentProvider } from '../../..';
import { type NanoId } from '../../shared';

export interface GetStripeDashboardUrlInput {
    dataSourceAdapter: DataSource.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function getStripeDashboardUrl({
    dataSourceAdapter,
    paymentAdapter,
    logger,
    context,
    request,
}: GetStripeDashboardUrlInput): Promise<string | undefined> {
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
