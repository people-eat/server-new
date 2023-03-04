import { Price } from '../core/shared.js';

export interface CreateStripePaymentIntentResponse {
    paymentIntentId: string;
    clientSecret: string;
}

export interface PaymentProviderAdapter {
    createStripePaymentIntent: (price: Price) => Promise<CreateStripePaymentIntentResponse | undefined>;
}
