import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Courses')
export class CourseEntity implements Database.DBCourse {
    @PrimaryColumn('char', { length: 20 })
    courseId: string;

    @Column('char', { length: 20 })
    menuId: string;

    @Column('char', { length: 20 })
    cookId: string;

    // @Column('smallint', { unsigned: 20 })
    index: number;

    type: string;
}
