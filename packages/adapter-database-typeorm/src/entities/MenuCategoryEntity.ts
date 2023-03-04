import { Database } from '@people-eat/server-domain';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('MenuCategories')
export class MenuCategoryEntity implements Database.DBMenuCategory {
    @PrimaryColumn('char', { length: 20 })
    menuId: string;

    @PrimaryColumn('char', { length: 20 })
    categoryId: string;
}
