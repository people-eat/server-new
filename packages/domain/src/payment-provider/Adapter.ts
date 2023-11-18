import { type CurrencyCode, type PaymentProvider, type Price } from '../core/shared';

export interface CreatePaymentIntentInput {
    currencyCode: CurrencyCode;
    amount: number;
    userId: string;
    setupIntentId: string;
    destinationAccountId: string;
}

export interface CreateConnectedAccountInput {
    emailAddress: string;
}

export interface CreateConnectedAccountOnboardingUrlInput {
    accountId: string;
}

export interface IsConnectedAccountEnabledInput {
    accountId: string;
}

export interface CreateConnectedAccountDashboardUrlInput {
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
        createConnectedAccountOnboardingUrl(input: CreateConnectedAccountOnboardingUrlInput): Promise<{ url: string } | undefined>;
        isConnectedAccountEnabled(input: IsConnectedAccountEnabledInput): Promise<boolean>;
        createConnectedAccountDashboardUrl(input: CreateConnectedAccountDashboardUrlInput): Promise<{ url: string } | undefined>;
        transferPaymentToCookAccount(input: TransferPaymentToCookAccountInput): Promise<boolean>;
    }
>;
