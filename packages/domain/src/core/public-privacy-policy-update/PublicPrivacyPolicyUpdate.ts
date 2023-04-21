import { type PrivacyPolicyUpdate } from '../privacy-policy-update';

export type PublicPrivacyPolicyUpdate = Omit<PrivacyPolicyUpdate, 'adminId'>;
