import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CookSpecificFees')
export class CookSpecificFeeEntity implements Database.DBCookSpecificFee {
    @PrimaryColumn('char', { length: 20 })
    cookId: string;

    fee: number;

    adminId: string;

    @Column('datetime')
    createdAt: Date;
}
