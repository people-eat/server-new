import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('UserRatings')
export class UserRatingEntity implements Database.DBUserRating {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId: string;

    @Column('char', { length: 20 })
    userId: string;

    @Column('char', { length: 20 })
    cookId: string;

    @Column('varchar')
    message: string;

    @Column('int', { unsigned: true })
    rating: number;

    @Column('datetime')
    createdAt: Date;
}
