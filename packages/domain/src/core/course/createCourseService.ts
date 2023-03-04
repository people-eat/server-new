import { Database, Logger } from '../../index.js';

export interface CourseService {}

export interface CreateCourseServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createCourseService({ databaseAdapter, logger }: CreateCourseServiceInput): CourseService {
    return {};
}
