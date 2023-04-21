import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('SearchRequests')
export class SearchRequestEntity implements DataSource.DBSearchRequest {
    @PrimaryColumn('char', { length: 20 })
    searchRequestId!: string;

    @Column('smallint', { unsigned: true })
    adults!: number;

    @Column('smallint', { unsigned: true })
    children!: number;

    @Column('float', { unsigned: true })
    latitude!: number;

    @Column('float', { unsigned: true })
    longitude!: number;

    // @Column('datetime')
    // createdAt!: Date;
}
