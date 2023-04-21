import { type DataSource, type Shared } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CookEntity } from './CookEntity';

@Entity('Meals')
export class MealEntity implements DataSource.DBMeal {
    @PrimaryColumn('char', { length: 20 })
    mealId!: string;

    @Column('char', { length: 20 })
    cookId!: string;

    @Column('varchar')
    title!: string;

    @Column('text')
    description!: string;

    @Column('varchar', { nullable: true })
    imageUrl?: string;

    @Column('enum', {
        enum: ['SOUP', 'MEAT', 'FISH', 'VEGETARIAN', 'VEGAN', 'DESSERT', 'SPECIAL'],
        enumName: 'MealType',
    })
    type!: Shared.MealType;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => CookEntity, (cook: CookEntity) => cook.meals, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cookId' })
    cook?: CookEntity;
}
