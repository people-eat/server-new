import { type DataSource, type Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ConfiguredMenus')
export class ConfiguredMenuEntity implements DataSource.DBConfiguredMenu {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId!: string;

    @Column('char', { length: 20 })
    menuId!: string;

    @Column('varchar')
    title!: string;

    @Column('text')
    description!: string;

    @Column('bool')
    greetingFromKitchen!: boolean;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('json')
    courses!: {
        index: number;
        title: string;
        mealTitle: string;
        mealDescription: string;
        mealImageUrl?: string | undefined;
        mealType: Shared.MealType;
    }[];
}
