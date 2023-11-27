import { type Authorization, type Course, type DataSource, type Logger } from '../../..';
import { type DBCourse, type DBMeal, type DBMealOption } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface FindManyPublicMenuCoursesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { menuId: NanoId };
}

export async function findAllCourses({ dataSourceAdapter, request }: FindManyPublicMenuCoursesInput): Promise<Course[] | undefined> {
    const { menuId } = request;

    const courses: DBCourse[] | undefined = await dataSourceAdapter.courseRepository.findMany({ menuId });

    if (!courses) return;

    for (const course of courses) {
        const mealOptions: DBMealOption[] | undefined = await dataSourceAdapter.mealOptionRepository.findMany({
            courseId: course.courseId,
        });

        if (!mealOptions) continue;

        for (const mealOption of mealOptions) {
            const meal: DBMeal | undefined = await dataSourceAdapter.mealRepository.findOne({ mealId: mealOption.mealId });

            if (!meal) continue;

            mealOption.meal = meal;
        }

        course.mealOptions = mealOptions;
    }

    return courses;
}
