import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type Course } from './Course';
import { type CreateOneCourseRequest } from './CreateOneCourseRequest';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findAll } from './useCases/findAll';

export interface CourseService {
    findAll(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId }): Promise<Course[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneCourseRequest & { cookId: NanoId; menuId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; courseId: NanoId }): Promise<boolean>;
}

export function createCourseService({ dataSourceAdapter, logger }: Runtime): CourseService {
    return {
        findAll: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId }) =>
            findAll({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneCourseRequest & { cookId: NanoId; menuId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { cookId: NanoId; menuId: NanoId; courseId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
