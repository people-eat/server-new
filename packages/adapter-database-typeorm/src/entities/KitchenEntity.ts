import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Kitchens')
export class KitchenEntity implements Database.DBKitchen {
    @PrimaryColumn('char', { length: 20 })
    kitchenId: string;

    @Column('varchar')
    title: string;
}
