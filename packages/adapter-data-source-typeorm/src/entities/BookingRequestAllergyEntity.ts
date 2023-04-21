import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('BookingRequestAllergies')
export class BookingRequestAllergyEntity implements DataSource.DBBookingRequestAllergy {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId!: string;

    @Column('varchar')
    allergyId!: string;
}
