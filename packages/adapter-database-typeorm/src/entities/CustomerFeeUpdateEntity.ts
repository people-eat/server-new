import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CustomerFeeUpdates')
export class CustomerFeeUpdateEntity implements Database.DBCustomerFeeUpdate {
    @PrimaryColumn('char', { length: 20 })
    customerFeeUpdateId: string;

    @Column('smallint', { unsigned: true })
    fee: number;

    @Column('char', { length: 20 })
    adminId: string;

    @Column('datetime')
    createdAt: Date;
}
