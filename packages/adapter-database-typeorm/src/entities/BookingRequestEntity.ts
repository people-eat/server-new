import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('BookingRequests')
export class BookingRequestEntity implements Database.DBBookingRequest {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId: string;

    @Column('char', { length: 20 })
    userId: string;

    @Column('char', { length: 20 })
    cookId: string;

    @Column('float', { unsigned: true })
    latitude: number;

    @Column('float', { unsigned: true })
    longitude: number;

    @Column('datetime')
    dateTime: Date;

    @Column('smallint', { unsigned: true })
    preparationTime: number;

    @Column('smallint', { unsigned: true })
    duration: number;

    @Column('smallint', { unsigned: true })
    adultParticipants: number;

    @Column('smallint', { unsigned: true })
    children: number;

    @Column('smallint', { unsigned: true })
    amount: number;

    @Column('enum', {
        enumName: 'CurrencyCode',
        enum: ['EUR', 'USD'],
    })
    currencyCode: Shared.CurrencyCode;

    @Column('smallint', { unsigned: true })
    customerFee: number;

    @Column('smallint', { unsigned: true })
    cookFee: number;

    @Column('varchar')
    occasion: string;

    @Column('varchar')
    message: string;

    @Column('datetime')
    createdAt: Date;
}
