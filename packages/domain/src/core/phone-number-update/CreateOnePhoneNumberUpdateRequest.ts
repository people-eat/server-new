import { type NanoId } from '../shared';

export interface CreateOnePhoneNumberUpdateRequest {
    userId: NanoId;
    phoneNumber: string;
}
