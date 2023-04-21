import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CookRatings')
export class CookRatingEntity implements DataSource.DBCookRating {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId!: string;

    @Column('char', { length: 20 })
    userId!: string;

    @Column('char', { length: 20 })
    cookId!: string;

    @Column('text')
    message!: string;

    @Column('smallint', { unsigned: true })
    rating!: number;

    @Column('datetime')
    createdAt!: Date;
}
