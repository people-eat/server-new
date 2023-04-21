import { type TermsUpdate } from '../terms-update';

export type PublicTermsUpdate = Omit<TermsUpdate, 'adminId'>;
