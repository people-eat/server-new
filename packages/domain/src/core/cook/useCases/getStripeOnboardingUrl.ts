import { Authorization, type DataSource, type Logger, type PaymentProvider } from '../../..';
import { type NanoId } from '../../shared';

export interface GetStripeOnboardingUrlInput {
    dataSourceAdapter: DataSource.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function getStripeOnboardingUrl({
    dataSourceAdapter,
    paymentAdapter,
    logger,
    context,
    request,
}: GetStripeOnboardingUrlInput): Promise<string | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DataSource.DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    const [payoutMethod] = cook.payoutMethods;

    if (!payoutMethod) return;

    const { stripeAccountId } = payoutMethod;

    const onboardingUrlResult: { url: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccountOnboardingUrl({
        accountId: stripeAccountId,
    });

    if (!onboardingUrlResult) return;

    const { url } = onboardingUrlResult;

    return url;
}
