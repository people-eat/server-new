import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('FavoriteCooks')
export class FavoriteCookEntity implements Database.DBFavoriteCook {
    @PrimaryColumn('char', { length: 20 })
    userId: string;

    @PrimaryColumn('char', { length: 20 })
    cookId: string;

    @Column('datetime')
    createdAt: Date;
}
