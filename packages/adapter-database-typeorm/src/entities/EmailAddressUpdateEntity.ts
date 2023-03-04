import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('EmailAddressUpdates')
export class EmailAddressUpdateEntity implements Database.DBEmailAddressUpdate {
    @PrimaryColumn('char', { length: 20 })
    userId: string;

    @Column('char', { length: 20 })
    secret: string;

    @Column()
    emailAddress: string;

    @Column('datetime')
    createdAt: Date;
}
