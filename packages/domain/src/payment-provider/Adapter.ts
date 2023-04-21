import { type PaymentProvider } from '../core/shared';

export type Adapter = Record<PaymentProvider, () => Promise<undefined>>;
