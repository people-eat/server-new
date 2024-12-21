import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBMeal, type DBMealOption } from '../../../data-source';
import { type NanoId } from '../../shared';
import { type Menu } from '../Menu';

export interface FindOneMenuInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    skipAuthCheck?: boolean;
    request: { cookId: NanoId; menuId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request, skipAuthCheck }: FindOneMenuInput): Promise<Menu | undefined> {
    const { menuId, cookId } = request;

    if (!skipAuthCheck) await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const menu: DataSource.DBMenu | undefined = await dataSourceAdapter.menuRepository.findOne({ menuId, cookId });

    if (!menu) return;

    if (menu.keyMealOptionCourseId && menu.keyMealOptionIndex) {
        const keyMealOption: DBMealOption | undefined = await dataSourceAdapter.mealOptionRepository.findOne({
            courseId: menu.keyMealOptionCourseId,
            index: menu.keyMealOptionIndex,
        });

        if (!keyMealOption) return menu;

        const keyMeal: DBMeal | undefined = await dataSourceAdapter.mealRepository.findOne({ mealId: keyMealOption.mealId });

        return { ...menu, imageUrl: keyMeal?.imageUrl };
    }

    return menu;
}
