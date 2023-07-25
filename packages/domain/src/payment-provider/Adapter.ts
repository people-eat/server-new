import { type CurrencyCode, type PaymentProvider } from '../core/shared';

export interface CreatePaymentIntentInput {
    currencyCode: CurrencyCode;
    amount: number;
}

export type Adapter = Record<
    PaymentProvider,
    { createPaymentIntent: (input: CreatePaymentIntentInput) => Promise<{ clientSecret: string } | undefined> }
>;
