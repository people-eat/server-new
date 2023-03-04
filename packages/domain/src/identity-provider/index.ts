import { IdentityProvider } from '../core/shared.js';

export interface IdentityProviderResult {
    emailAddress?: string;
    phoneNumber?: string;
}

export type IdentityProviderAdapter = Record<IdentityProvider, (idToken: string) => Promise<IdentityProviderResult | undefined>>;
