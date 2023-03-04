import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('MealOptions')
export class MealOptionEntity implements Database.DBMealOption {
    @PrimaryColumn('char', { length: 20 })
    mealOptionId: string;

    @Column('char', { length: 20 })
    courseId: string;

    @Column('char', { length: 20 })
    cookId: string;

    @Column('tinyint', { unsigned: true })
    index: number;

    @Column('char', { length: 20 })
    mealId: string;
}
