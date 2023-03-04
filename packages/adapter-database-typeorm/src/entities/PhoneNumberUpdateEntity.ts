import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('PhoneNumberUpdates')
export class PhoneNumberUpdateEntity implements Database.DBPhoneNumberUpdate {
    @PrimaryColumn('char', { length: 20 })
    userId: string;

    @Column('char', { length: 20 })
    secret: string;

    @Column()
    phoneNumber: string;

    @Column('datetime')
    createdAt: Date;
}
