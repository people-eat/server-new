import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBMealOption } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface DeleteOneMealOptionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; courseId: NanoId; mealId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneMealOptionInput): Promise<boolean> {
    const { cookId, courseId, mealId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const mealOption: DBMealOption | undefined = await dataSourceAdapter.mealOptionRepository.findOne({ cookId, courseId, mealId });

    if (!mealOption) {
        logger.error('Tried to delete non existing meal option');
        return false;
    }

    const success: boolean = await dataSourceAdapter.mealOptionRepository.deleteOne({ cookId, courseId, mealId });

    if (success) {
        await dataSourceAdapter.query(`
            UPDATE
                MealOptions
            SET
                MealOptions.index = MealOptions.index - 1
            WHERE
                MealOptions.cookId='${cookId}' AND
                MealOptions.courseId='${courseId}' AND
                MealOptions.courseId='${courseId}' AND
                MealOptions.index > ${mealOption.index}
        `);
    }

    return success;
}
