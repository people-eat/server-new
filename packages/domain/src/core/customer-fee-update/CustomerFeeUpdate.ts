import { type NanoId } from '../shared';

export interface CustomerFeeUpdate {
    customerFeeUpdateId: NanoId;
    fee: number;
    adminId: NanoId;
    createdAt: Date;
}
