import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBCourse } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface DeleteOneCourseInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; menuId: NanoId; courseId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneCourseInput): Promise<boolean> {
    const { cookId, menuId, courseId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const course: DBCourse | undefined = await dataSourceAdapter.courseRepository.findOne({ cookId, menuId, courseId });

    if (!course) {
        logger.error('Tried to delete non existing course');
        return false;
    }

    const success: boolean = await dataSourceAdapter.courseRepository.deleteOne({ cookId, menuId, courseId });

    if (success) {
        await dataSourceAdapter.query(`
            UPDATE
                Courses
            SET
                Courses.index = Courses.index - 1
            WHERE
                Courses.cookId='${cookId}' AND
                Courses.menuId='${menuId}' AND
                Courses.index > ${course.index}
        `);
    }

    return success;
}
