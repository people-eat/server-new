import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Menus')
export class MenuEntity implements Database.DBMenu {
    @PrimaryColumn('char', { length: 20 })
    menuId: string;

    @Column('char', { length: 20 })
    cookId: string;

    @Column('bool')
    isVisible: boolean;

    @Column('varchar')
    title: string;

    @Column('text')
    description: string;

    @Column('smallint', { unsigned: true })
    preparationTime: number;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('bool')
    greetingFromKitchen: boolean;

    @Column('smallint', { unsigned: true })
    basePrice: number;

    @Column('smallint', { unsigned: true })
    basePriceCustomers: number;

    @Column('smallint', { unsigned: true })
    pricePerAdult: number;

    @Column('smallint', { unsigned: true, nullable: true })
    pricePerChild?: number;

    @Column('enum', {
        enumName: 'CurrencyCode',
        enum: ['EUR', 'USD'],
    })
    currencyCode: Shared.CurrencyCode;

    @Column('datetime')
    createdAt: Date;
}
