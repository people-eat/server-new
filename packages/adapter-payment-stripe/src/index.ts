import { type Logger, type PaymentProvider } from '@people-eat/server-domain';
import { Stripe } from 'stripe';

export interface CreatePaymentAdapterInput {
    logger: Logger.Adapter;
    stripeSecretKey: string;
}

export function createPaymentAdapter({ logger, stripeSecretKey }: CreatePaymentAdapterInput): PaymentProvider.Adapter {
    const client: Stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

    return {
        STRIPE: {
            createSetupIntent: async (): Promise<{ setupIntentId: string; clientSecret: string } | undefined> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.create({
                        usage: 'off_session',
                        automatic_payment_methods: { enabled: true },
                    });

                    if (!setupIntent.client_secret) return undefined;

                    return {
                        setupIntentId: setupIntent.id,
                        clientSecret: setupIntent.client_secret,
                    };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            createPaymentIntent: async ({ setupIntentId, amount }: PaymentProvider.CreatePaymentIntentInput): Promise<boolean> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.retrieve(setupIntentId);

                    const paymentMethodId: string | null | Stripe.PaymentMethod = setupIntent.payment_method;

                    if (typeof paymentMethodId !== 'string') return false;

                    const customer: Stripe.Customer = await client.customers.create({});

                    await client.paymentMethods.attach(paymentMethodId, { customer: customer.id });

                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        customer: customer.id,
                        payment_method: paymentMethodId,
                        amount,
                        currency: 'eur',
                        confirm: true,
                    });

                    return paymentIntent.status === 'succeeded';
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
            createConnectedAccount: async ({
                emailAddress,
            }: PaymentProvider.CreateConnectedAccountInput): Promise<{ accountId: string } | undefined> => {
                try {
                    const account: Stripe.Account = await client.accounts.create({
                        type: 'standard',
                        email: emailAddress,
                    });

                    return { accountId: account.id };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            createConnectedAccountUrl: async ({
                accountId,
            }: PaymentProvider.CreateConnectedAccountUrlInput): Promise<{ url: string } | undefined> => {
                try {
                    const accountLink: Stripe.AccountLink = await client.accountLinks.create({
                        account: accountId,
                        refresh_url: 'https://example.com/reauth',
                        return_url: 'https://example.com/return',
                        type: 'account_onboarding',
                    });

                    return { url: accountLink.url };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
            transferPaymentToCookAccount: async ({
                accountId,
                price,
            }: PaymentProvider.TransferPaymentToCookAccountInput): Promise<boolean> => {
                try {
                    await client.transfers.create({
                        amount: price.amount,
                        currency: 'eur',
                        destination: accountId,
                    });

                    return true;
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
        },
    };
}
