import { type NanoId } from '../shared';

export interface PrivacyPolicyUpdate {
    privacyPolicyUpdateId: NanoId;
    germanText: string;
    englishText: string;
    adminId: NanoId;
    createdAt: Date;
}
