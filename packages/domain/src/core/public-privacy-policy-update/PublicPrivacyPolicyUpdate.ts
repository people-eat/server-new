import { PrivacyPolicyUpdate } from '../privacy-policy-update/index.js';

export type PublicPrivacyPolicyUpdate = Omit<PrivacyPolicyUpdate, 'adminId'>;
