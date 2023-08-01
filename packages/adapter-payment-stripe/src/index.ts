import { type Logger, type PaymentProvider } from '@people-eat/server-domain';
import { Stripe } from 'stripe';
import { type CreatePaymentIntentInput } from '../../domain/src/payment-provider';

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
                    throw error;
                    return undefined;
                }
            },
            createPaymentIntent: async ({ setupIntentId, amount }: CreatePaymentIntentInput): Promise<boolean> => {
                try {
                    const setupIntent: Stripe.SetupIntent = await client.setupIntents.retrieve(setupIntentId);
                    console.log({ setupIntent });

                    const paymentMethodId: string | null | Stripe.PaymentMethod = setupIntent.payment_method;

                    if (typeof paymentMethodId !== 'string') return false;

                    const customer: Stripe.Customer = await client.customers.create({});
                    console.log({ customer });

                    await client.paymentMethods.attach(paymentMethodId, { customer: customer.id });

                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        customer: customer.id,
                        payment_method: paymentMethodId,
                        amount,
                        currency: 'eur',
                        confirm: true,
                    });

                    console.log({ paymentIntent });

                    return true;
                } catch (error) {
                    logger.error(error);
                    return false;
                }
            },
        },
    };
}
