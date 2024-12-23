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
    runtime: { dataSourceAdapter, logger, paymentAdapter, emailAdapter, notificationEmailAddresses, publisher },
    context,
    request,
}: UpdateCookMinimumPriceInput): Promise<boolean> {
    const { cookId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return false;

    const [paymentMethod] = cook.payoutMethods ?? [];

    if (!paymentMethod) {
        emailAdapter
            .sendToMany(
                'PeopleEat Logs',
                notificationEmailAddresses,
                'updateHasStripePayoutMethodActivated error',
                `Koch mit id ${cook.cookId} hat versucht payout Methode zu aktivieren, ohne payout Methoden zu haben`,
            )
            .then(() => undefined)
            .catch(() => undefined);
        return false;
    }

    const hasStripePayoutMethodActivated: boolean = await paymentAdapter.STRIPE.isConnectedAccountEnabled({
        accountId: paymentMethod.stripeAccountId,
    });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne(
        { cookId },
        { payoutMethods: [{ ...paymentMethod, active: hasStripePayoutMethodActivated }] },
    );

    if (!success) {
        emailAdapter
            .sendToMany(
                'PeopleEat Logs',
                notificationEmailAddresses,
                'updateHasStripePayoutMethodActivated error',
                `Koch mit id ${cook.cookId} hat versucht payout Methode zu aktivieren, Fehler bei stripe Anfrage`,
            )
            .then(() => undefined)
            .catch(() => undefined);
    }

    if (success) await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    return success;
}
