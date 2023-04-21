import { type NanoId } from '../shared';

export interface OneTimeAccessToken {
    userId: NanoId;
    createdAt: Date;
}
