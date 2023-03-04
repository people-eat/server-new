import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Meal')
export class MealEntity implements Database.DBMeal {
    @PrimaryColumn('char', { length: 20 })
    mealId: string;

    @Column('char', { length: 20 })
    cookId: string;

    @Column('varchar')
    title: string;

    @Column('text')
    description: string;

    @Column('varchar', { nullable: true })
    imageUrl?: string;

    type: Shared.MealType;

    @Column('datetime')
    createdAt: Date;
}
