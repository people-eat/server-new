import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBCourse, type DBMealOption } from '../../../data-source';
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
        keyMealOptionCourseIndex,
        keyMealOptionIndex,
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
    });

    const dbMealOptions: DBMealOption[] = [];

    let keyMealOptionCourseId: string | undefined;

    if (courses) {
        await dataSourceAdapter.courseRepository.insertMany(
            courses.map(({ index: courseIndex, title: courseTitle, mealOptions }: CreateOneCourseRequest): DBCourse => {
                const courseId: NanoId = createNanoId();

                if (keyMealOptionCourseIndex === courseIndex) keyMealOptionCourseId = courseId;

                if (mealOptions) {
                    dbMealOptions.push(
                        ...mealOptions.map(({ index: mealOptionIndex, mealId }: CreateOneMealOptionRequest) => ({
                            courseId,
                            cookId,
                            index: mealOptionIndex,
                            mealId,
                        })),
                    );
                }

                return {
                    courseId,
                    menuId,
                    cookId,
                    index: courseIndex,
                    title: courseTitle,
                };
            }),
        );
    }

    if (dbMealOptions.length > 0) await dataSourceAdapter.mealOptionRepository.insertMany(dbMealOptions);

    if (keyMealOptionCourseId !== undefined && keyMealOptionIndex !== undefined)
        await dataSourceAdapter.menuRepository.updateOne({ menuId }, { keyMealOptionCourseId, keyMealOptionIndex });

    if (!categoryIds) return menuCreationSuccess;

    const categorySuccess: boolean = await dataSourceAdapter.menuCategoryRepository.insertMany(
        categoryIds.map((categoryId: NanoId) => ({ cookId, menuId, categoryId })),
    );

    return categorySuccess;
}
