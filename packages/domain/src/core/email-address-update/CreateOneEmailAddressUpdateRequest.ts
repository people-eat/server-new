import { type NanoId } from '../shared';

export interface CreateOneEmailAddressUpdateRequest {
    userId: NanoId;
    emailAddress: string;
}
