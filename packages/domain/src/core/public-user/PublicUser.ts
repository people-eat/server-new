import { type NanoId } from '../shared';

export interface PublicUser {
    userId: NanoId;
    firstName: string;
    profilePictureUrl?: string;
}
