import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { MealOptionEntity } from './MealOptionEntity';
import { MenuEntity } from './MenuEntity';

@Entity('Courses')
@Index(['courseId', 'cookId'])
export class CourseEntity implements DataSource.DBCourse {
    @PrimaryColumn('char', { length: 20 })
    courseId!: string;

    @Column('char', { length: 20 })
    menuId!: string;

    @Column('char', { length: 20 })
    cookId!: string;

    @Column('smallint', { unsigned: true })
    index!: number;

    @Column('varchar')
    title!: string;

    /* relations */

    @ManyToOne(() => MenuEntity, (menu: MenuEntity) => menu.courses, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([
        { name: 'menuId', referencedColumnName: 'menuId' },
        { name: 'cookId', referencedColumnName: 'cookId' },
    ])
    menu?: MenuEntity;

    @OneToMany(() => MealOptionEntity, (mealOption: MealOptionEntity) => mealOption.course, { cascade: true })
    mealOptions?: MealOptionEntity[];
}
