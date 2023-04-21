import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CourseEntity } from './CourseEntity';
import { MealEntity } from './MealEntity';

@Entity('MealOptions')
export class MealOptionEntity implements DataSource.DBMealOption {
    @PrimaryColumn('char', { length: 20 })
    mealId!: string;

    @Column('char', { length: 20 })
    courseId!: string;

    @Column('char', { length: 20 })
    cookId!: string;

    @Column('tinyint', { unsigned: true })
    index!: number;

    /* relations */

    @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.mealOptions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([
        { name: 'courseId', referencedColumnName: 'courseId' },
        { name: 'cookId', referencedColumnName: 'cookId' },
    ])
    course?: CourseEntity;

    @ManyToOne(() => MealEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'mealId' })
    meal?: MealEntity;
}
