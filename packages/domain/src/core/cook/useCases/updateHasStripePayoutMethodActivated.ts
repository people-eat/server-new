import { Authorization } from '../../..';
import { type DBCook } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookMinimumPriceInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
    };
}

export async function updateHasStripePayoutMethodActivated({
    runtime: { dataSourceAdapter, logger, paymentAdapter },
    context,
    request,
}: UpdateCookMinimumPriceInput): Promise<boolean> {
    const { cookId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return false;

    const [paymentMethod] = cook.payoutMethods ?? [];

    if (!paymentMethod) return false;

    const hasStripePayoutMethodActivated: boolean = await paymentAdapter.STRIPE.isConnectedAccountEnabled({
        accountId: paymentMethod.stripeAccountId,
    });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne(
        { cookId },
        { payoutMethods: [{ ...paymentMethod, active: hasStripePayoutMethodActivated }] },
    );

    return success;
}
