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
            createPaymentIntent: async ({
                currencyCode,
                amount,
            }: PaymentProvider.CreatePaymentIntentInput): Promise<{ clientSecret: string } | undefined> => {
                try {
                    const session: Stripe.Checkout.Session = await client.checkout.sessions.create({
                        // customer: 'Max Mustermann',
                        // customer_email: 'max.mustermann@gmail.com',
                        customer_creation: 'if_required',
                        currency: 'eur',
                        mode: 'setup',
                        setup_intent_data: {},
                        payment_method_types: ['card', 'paypal'],

                        // line_items: [
                        //     {
                        //         price_data: {
                        //             currency: 'eur',
                        //             product_data: {
                        //                 name: 'Menü Kosten',
                        //             },
                        //             unit_amount: amount,
                        //         },
                        //         quantity: 1,
                        //     },
                        //     {
                        //         price_data: {
                        //             currency: 'eur',
                        //             product_data: {
                        //                 name: 'Reisekosten',
                        //             },
                        //             unit_amount: amount,
                        //         },
                        //         quantity: 1,
                        //     },
                        //     {
                        //         price_data: {
                        //             currency: 'eur',
                        //             product_data: {
                        //                 name: 'Service Fee',
                        //                 images: [
                        //                     'https://www.daskochrezept.de/sites/daskochrezept.de/files/styles/full_width_tablet_4_3/public/2021-11/2021_steak-braten_aufmacher.jpg?h=5c915fe1&itok=LiuV_ZWZ',
                        //                 ],
                        //             },
                        //             unit_amount: amount,
                        //         },
                        //         quantity: 1,
                        //     },
                        // ],
                        success_url: 'http://localhost:4242/success',
                        cancel_url: 'http://localhost:3000',
                    });

                    console.log(session);

                    const paymentIntent: Stripe.PaymentIntent = await client.paymentIntents.create({
                        // instead provide a map
                        currency: currencyCode === 'EUR' ? 'eur' : 'eur',
                        amount,
                        automatic_payment_methods: { enabled: true },
                        // payment_method_types: ['card', 'paypal'],
                    });

                    // contains client secret
                    console.log({ paymentIntent });

                    if (!paymentIntent.client_secret) return undefined;

                    return {
                        clientSecret: paymentIntent.client_secret,
                    };
                } catch (error) {
                    logger.error(error);
                    return undefined;
                }
            },
        },
    };
}
