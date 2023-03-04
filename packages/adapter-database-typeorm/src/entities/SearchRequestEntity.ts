import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('SearchRequests')
export class SearchRequestEntity implements Database.DBSearchRequest {
    @PrimaryColumn('char', { length: 20 })
    searchRequestId: string;

    @Column('smallint', { unsigned: true })
    adults: number;

    @Column('smallint', { unsigned: true })
    children: number;

    @Column('float', { unsigned: true })
    latitude: number;

    @Column('float', { unsigned: true })
    longitude: number;
}
