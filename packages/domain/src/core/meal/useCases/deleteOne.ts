import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBCourse, type DBMealOption, type DBMenu } from '../../../data-source';
import { type NanoId } from '../../shared';
import { type DeleteMealResult } from '../DeleteMealResult';

export interface DeleteOneMealInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; mealId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneMealInput): Promise<DeleteMealResult> {
    const { cookId, mealId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const mealOption: DBMealOption | undefined = await dataSourceAdapter.mealOptionRepository.findOne({ cookId, mealId });

    if (mealOption) {
        const course: DBCourse | undefined = await dataSourceAdapter.courseRepository.findOne({ cookId, courseId: mealOption.courseId });

        if (!course) return { failedAt: new Date() };

        const menu: DBMenu | undefined = await dataSourceAdapter.menuRepository.findOne({ menuId: course.menuId });

        if (!menu) return { failedAt: new Date() };

        return {
            menuId: menu.menuId,
            menuTitle: menu.title,
        };
    }

    const success: boolean = await dataSourceAdapter.mealRepository.deleteOne({ mealId, cookId });

    if (!success) return { failedAt: new Date() };

    return { deletedAt: new Date() };
}
