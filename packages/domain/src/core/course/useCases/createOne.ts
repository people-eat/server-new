import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type CreateOneMealOptionRequest } from '../../meal-option';
import { type NanoId } from '../../shared';
import { type CreateOneCourseRequest } from '../CreateOneCourseRequest';

export interface CreateOneCourseInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCourseRequest & { cookId: NanoId; menuId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneCourseInput): Promise<boolean> {
    const { title, index, cookId, menuId, mealOptions } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const courseId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.courseRepository.insertOne({
        courseId,
        cookId,
        menuId,
        title: title.trim(),
        index,
        mealOptions: mealOptions?.map(({ index: mealOptionIndex, mealId }: CreateOneMealOptionRequest) => ({
            courseId,
            cookId,
            index: mealOptionIndex,
            mealId,
        })),
    });

    // last condition - ignore new course id, to avoid optimistic index updates for entries (before success)
    if (success) {
        await dataSourceAdapter.query(`
            UPDATE
                Courses
            SET
                Courses.index = Courses.index + 1
            WHERE
                Courses.cookId='${cookId}' AND
                Courses.menuId='${menuId}' AND
                Courses.index >= ${index} AND
                Courses.courseId != '${courseId}'
        `);
    }

    return success;
}
