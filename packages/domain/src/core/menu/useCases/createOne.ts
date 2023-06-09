import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBCourse } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type CreateOneCourseRequest } from '../../course';
import { type CreateOneMealOptionRequest } from '../../meal-option';
import { type NanoId } from '../../shared';
import { type CreateOneMenuRequest } from '../CreateOneMenuRequest';

export interface CreateOneMenuInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneMenuRequest & { cookId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneMenuInput): Promise<boolean> {
    const {
        cookId,
        isVisible,
        title,
        description,
        preparationTime,
        kitchenId,
        greetingFromKitchen,
        basePrice,
        basePriceCustomers,
        pricePerAdult,
        pricePerChild,
        currencyCode,
        courses,
        categoryIds,
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const menuId: NanoId = createNanoId();

    const menuCreationSuccess: boolean = await dataSourceAdapter.menuRepository.insertOne({
        menuId,
        cookId,
        isVisible,
        title: title.trim(),
        description: description.trim(),
        preparationTime,
        kitchenId,
        greetingFromKitchen,
        basePrice,
        basePriceCustomers,
        pricePerAdult,
        pricePerChild,
        currencyCode,
        createdAt: new Date(),
        courses: courses?.map(({ index: courseIndex, title: courseTitle, mealOptions }: CreateOneCourseRequest): DBCourse => {
            const courseId: NanoId = createNanoId();
            return {
                courseId,
                menuId,
                cookId,
                index: courseIndex,
                title: courseTitle,
                mealOptions: mealOptions?.map(({ index: mealOptionIndex, mealId }: CreateOneMealOptionRequest) => ({
                    courseId,
                    cookId,
                    index: mealOptionIndex,
                    mealId,
                })),
            };
        }),
    });

    if (!categoryIds) return menuCreationSuccess;

    const categorySuccess: boolean = await dataSourceAdapter.menuCategoryRepository.insertMany(
        categoryIds.map((categoryId: NanoId) => ({ cookId, menuId, categoryId })),
    );

    return categorySuccess;
}
