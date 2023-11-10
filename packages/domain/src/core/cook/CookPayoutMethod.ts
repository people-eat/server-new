export type CookPayoutMethod = CookPayoutMethodStripe;

export interface CookPayoutMethodStripe {
    provider: 'STRIPE';
    stripeAccountId: string;
    active: boolean;
}
