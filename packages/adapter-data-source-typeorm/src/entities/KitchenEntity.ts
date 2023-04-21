import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MenuEntity } from './MenuEntity';

@Entity('Kitchens')
export class KitchenEntity implements DataSource.DBKitchen {
    @PrimaryColumn('char', { length: 20 })
    kitchenId!: string;

    @Column('varchar')
    title!: string;

    /* relations */

    @OneToMany(() => MenuEntity, (menu: MenuEntity) => menu.kitchen)
    menus?: MenuEntity[];
}
