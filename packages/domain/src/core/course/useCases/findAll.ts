import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBMeal, type DBMealOption } from '../../../data-source';
import { type NanoId } from '../../shared';
import { type Course } from '../Course';

export interface FindManyCoursesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; menuId: NanoId };
}

export async function findAll({ dataSourceAdapter, logger, context, request }: FindManyCoursesInput): Promise<Course[] | undefined> {
    const { cookId, menuId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const courses: DataSource.DBCourse[] | undefined = await dataSourceAdapter.courseRepository.findMany({ cookId, menuId });

    if (!courses) return;

    for (const course of courses) {
        const mealOptions: DBMealOption[] | undefined = await dataSourceAdapter.mealOptionRepository.findMany({
            cookId,
            courseId: course.courseId,
        });

        if (!mealOptions) break;

        for (const mealOption of mealOptions) {
            const meal: DBMeal | undefined = await dataSourceAdapter.mealRepository.findOne({ cookId, mealId: mealOption.mealId });

            if (!meal) break;

            mealOption.meal = meal;
        }

        course.mealOptions = mealOptions;
    }

    return courses;
}
