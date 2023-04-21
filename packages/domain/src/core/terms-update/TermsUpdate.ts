import { type NanoId } from '../shared';

export interface TermsUpdate {
    termsUpdateId: NanoId;
    germanText: string;
    englishText: string;
    adminId: NanoId;
    createdAt: Date;
}
