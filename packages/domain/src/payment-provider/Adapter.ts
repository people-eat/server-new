import { type CurrencyCode, type PaymentProvider, type Price } from '../core/shared';

export interface CreatePaymentIntentInput {
    currencyCode: CurrencyCode;
    amount: number;
    userId: string;
    setupIntentId: string;
}

export interface CreateConnectedAccountInput {
    emailAddress: string;
}

export interface CreateConnectedAccountUrlInput {
    accountId: string;
}

export interface TransferPaymentToCookAccountInput {
    accountId: string;
    price: Price;
}

export type Adapter = Record<
    PaymentProvider,
    {
        createSetupIntent: () => Promise<{ setupIntentId: string; clientSecret: string } | undefined>;
        createPaymentIntent: (input: CreatePaymentIntentInput) => Promise<boolean>;
        createConnectedAccount(input: CreateConnectedAccountInput): Promise<{ accountId: string } | undefined>;
        createConnectedAccountUrl(input: CreateConnectedAccountUrlInput): Promise<{ url: string } | undefined>;
        transferPaymentToCookAccount(input: TransferPaymentToCookAccountInput): Promise<boolean>;
    }
>;
