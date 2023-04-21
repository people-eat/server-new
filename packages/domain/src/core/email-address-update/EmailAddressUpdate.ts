import { type NanoId } from '../shared';

export interface EmailAddressUpdate {
    userId: NanoId;
    emailAddress: string;
    createdAt: Date;
}
