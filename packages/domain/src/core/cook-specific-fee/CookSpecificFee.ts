import { type NanoId } from '../shared';

export interface CookSpecificFee {
    cookId: NanoId;
    fee: number;
    adminId: NanoId;
    createdAt: Date;
}
