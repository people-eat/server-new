import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Categories')
export class CategoryEntity implements Database.DBCategory {
    @PrimaryColumn('char', { length: 20 })
    categoryId: string;

    @Column('varchar')
    title: string;
}
