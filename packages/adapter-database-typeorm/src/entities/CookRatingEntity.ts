import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CookRatings')
export class CookRatingEntity implements Database.DBCookRating {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId: string;

    userId: string;

    cookId: string;

    message: string;

    rating: number;

    @Column('datetime')
    createdAt: Date;
}
