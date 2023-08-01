import { type CurrencyCode, type PaymentProvider } from '../core/shared';

export interface CreatePaymentIntentInput {
    currencyCode: CurrencyCode;
    amount: number;
    userId: string;
    setupIntentId: string;
}

export type Adapter = Record<
    PaymentProvider,
    {
        createSetupIntent: () => Promise<{ setupIntentId: string; clientSecret: string } | undefined>;
        createPaymentIntent: (input: CreatePaymentIntentInput) => Promise<boolean>;
    }
>;
