import { Logger, Payment } from '@people-eat/server-domain';
import { Stripe } from 'stripe';

export interface CreatePaymentProviderAdapterInput {
    logger: Logger.Adapter;
    stripSecretKey: string;
}

type StripCurrencyCode = 'eur' | 'usd';

const toStripeCurrencyCode: Record<Payment.CurrencyCode, StripCurrencyCode> = Object.freeze({
    ['EUR']: 'eur',
    ['USD']: 'usd',
});

// provide publishable key via a query to allow all clients to always use the current value and not a hardcoded one
export function createPaymentProviderAdapter({
    logger,
    stripSecretKey,
}: CreatePaymentProviderAdapterInput): Payment.PaymentProviderAdapter {
    return {
        createStripePaymentIntent: async ({
            amount,
            currencyCode,
        }: Payment.Price): Promise<Payment.CreateStripePaymentIntentResponse | undefined> => {
            const client: Stripe = new Stripe(stripSecretKey, { apiVersion: '2022-11-15' });

            const params: Stripe.PaymentIntentCreateParams = {
                amount: amount,
                currency: toStripeCurrencyCode[currencyCode],
                // Note: depending on the incoming currency, not all payment methods are available
                payment_method_types: ['card'],
            };

            try {
                const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create(params, {});

                if (!paymentIntent.client_secret) return;

                return {
                    paymentIntentId: paymentIntent.id,
                    clientSecret: paymentIntent.client_secret,
                };
            } catch (error) {
                logger.error(error);
            }
        },
    };
}
