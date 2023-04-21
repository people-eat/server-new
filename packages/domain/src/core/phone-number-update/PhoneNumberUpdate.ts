import { type NanoId } from '../shared';

export interface PhoneNumberUpdate {
    userId: NanoId;
    phoneNumber: string;
    createdAt: Date;
}
