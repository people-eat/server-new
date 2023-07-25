import { type DataSource } from '@people-eat/server-domain';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { MenuEntity } from './MenuEntity';

@Entity('MenuCategories')
export class MenuCategoryEntity implements DataSource.DBMenuCategory {
    @PrimaryColumn('char', { length: 20 })
    menuId!: string;

    @PrimaryColumn('char', { length: 20 })
    cookId!: string;

    @PrimaryColumn('char', { length: 20 })
    categoryId!: string;

    /* relations */

    @ManyToOne(() => MenuEntity, (menu: MenuEntity) => menu.menuCategories, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([
        { name: 'menuId', referencedColumnName: 'menuId' },
        { name: 'cookId', referencedColumnName: 'cookId' },
    ])
    menu?: MenuEntity;

    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.menuCategories, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category?: CategoryEntity;
}
