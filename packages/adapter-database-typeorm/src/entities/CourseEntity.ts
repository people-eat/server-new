import { Database } from '@people-eat/server-domain';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Courses')
export class CourseEntity implements Database.DBCourse {
    @PrimaryColumn('char', { length: 20 })
    courseId: string;

    menuId: string;

    cookId: string;

    index: number;

    type: string;
}
