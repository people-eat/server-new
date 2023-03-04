import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Addresses')
export class AddressEntity implements Database.DBAddress {
    @PrimaryColumn('char', { length: 20 })
    addressId: string;

    @Column('char', { length: 20 })
    userId: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    country: string;

    @Column('varchar')
    city: string;

    @Column('varchar')
    postCode: string;

    @Column('varchar')
    street: string;

    @Column('varchar')
    houseNumber: string;

    @Column('float', { unsigned: true })
    latitude: number;

    @Column('float', { unsigned: true })
    longitude: number;

    @Column('datetime')
    createdAt: Date;
}
