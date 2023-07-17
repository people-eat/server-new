import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MenuCategoryEntity } from './MenuCategoryEntity';

@Entity('Categories')
export class CategoryEntity implements DataSource.DBCategory {
    @PrimaryColumn('char', { length: 20 })
    categoryId!: Shared.NanoId;

    @Column('varchar')
    title!: string;

    /* relations */

    @OneToMany(() => MenuCategoryEntity, (menuCategory: MenuCategoryEntity) => menuCategory.category, { cascade: true })
    menuCategories?: MenuCategoryEntity[];
}
