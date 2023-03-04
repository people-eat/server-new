import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CustomerFeeUpdates')
export class CustomerFeeUpdateEntity implements Database.DBCustomerFeeUpdate {
    @PrimaryColumn('char', { length: 20 })
    customerFeeUpdateId: string;

    fee: number;

    adminId: string;

    @Column('datetime')
    createdAt: Date;
}
