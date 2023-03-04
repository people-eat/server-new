import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('BookingRequestAllergies')
export class BookingRequestAllergyEntity implements Database.DBBookingRequestAllergy {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId: string;

    @Column('varchar')
    allergyId: string;
}
