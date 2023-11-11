import { Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface GetStripeOnboardingUrlInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId };
}

export async function getStripeOnboardingUrl({ runtime, context, request }: GetStripeOnboardingUrlInput): Promise<string | undefined> {
    const { dataSourceAdapter, paymentAdapter, logger } = runtime;
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
