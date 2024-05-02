import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBMeal, type DBMealOption, type DBMenu } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface FindOneMenuKeyMealOptionImageUrlInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { menuId: NanoId };
}

export async function findKeyMealOptionImageUrl({
    dataSourceAdapter,
    request,
}: FindOneMenuKeyMealOptionImageUrlInput): Promise<string | undefined> {
    const { menuId } = request;

    const menu: DBMenu | undefined = await dataSourceAdapter.menuRepository.findOne({ menuId });

    if (!menu || menu.keyMealOptionCourseId === undefined || menu.keyMealOptionIndex === undefined) return undefined;

    const keyMealOption: DBMealOption | undefined = await dataSourceAdapter.mealOptionRepository.findOne({
        courseId: menu.keyMealOptionCourseId,
        index: menu.keyMealOptionIndex,
    });

    if (!keyMealOption) return undefined;

    const meal: DBMeal | undefined = await dataSourceAdapter.mealRepository.findOne({ mealId: keyMealOption.mealId });

    return meal?.imageUrl;
}
