import { TermsUpdate } from '../terms-update/index.js';

export type PublicTermsUpdate = Omit<TermsUpdate, 'adminId'>;
