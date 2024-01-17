import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SearchRequestOrigin } from '../../../domain/src/core/search-request/SearchRequest';

@Entity('SearchRequests')
export class SearchRequestEntity implements DataSource.DBSearchRequest {
    @PrimaryColumn('char', { length: 20 })
    searchRequestId!: string;

    @Column('smallint', { unsigned: true })
    adults!: number;

    @Column('smallint', { unsigned: true })
    children!: number;

    @Column('varchar')
    locationText!: string;

    @Column('date')
    date!: string;

    @Column('enum', {
        enum: ['HOME', 'PUBLIC_MENUS', 'PUBLIC_COOKS'],
        enumName: 'SearchRequestOrigin',
    })
    origin!: SearchRequestOrigin;

    @Column('datetime')
    createdAt!: Date;
}
