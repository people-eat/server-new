import { Authorization, type Course, type DataSource, type Logger, type MealOption, type Menu } from '../../..';
import { type NanoId } from '../../shared';
import { type ConfiguredMenuCourse } from '../ConfiguredMenu';
import { type CreateOneConfiguredMenuRequest } from '../CreateOneConfiguredMenuRequest';

import { type DBBookingRequest } from '../../../data-source';
import { findOne as findOneMenu } from '../../menu/useCases/findOne';
import { findAllCourses } from '../../public-menu/useCases/findAllCourses';

export interface CreateOneConfiguredMenuInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId; configuredMenu: CreateOneConfiguredMenuRequest };
}

export async function createOne({ dataSourceAdapter, logger, request, context }: CreateOneConfiguredMenuInput): Promise<boolean> {
    const { userId, bookingRequestId, configuredMenu } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({ bookingRequestId });

    if (!bookingRequest) return false;

    const menu: Menu | undefined = await findOneMenu({
        dataSourceAdapter,
        logger,
        context,
        request: { cookId: bookingRequest.cookId, menuId: configuredMenu.menuId },
    });

    const courses: Course[] | undefined = await findAllCourses({
        dataSourceAdapter,
        logger,
        context,
        request: { menuId: configuredMenu.menuId },
    });

    if (!menu || !courses) return false;

    const configuredMenuCourses: ConfiguredMenuCourse[] = [];

    for (const configuredCourse of configuredMenu.courses) {
        const course: Course | undefined = courses.find((c: Course) => c.courseId === configuredCourse.courseId);
        if (!course) {
            logger.info("Didn't find course");
            return false;
        }

        const selectedMeal: MealOption | undefined = course.mealOptions?.find(
            (mealOption: MealOption) => mealOption.mealId === configuredCourse.mealId,
        );

        if (!selectedMeal) {
            logger.info("Didn't find selected meal");
            return false;
        }

        configuredMenuCourses.push({
            index: course.index,
            title: course.title,
            mealTitle: selectedMeal.meal?.title ?? '',
            mealDescription: selectedMeal.meal?.description ?? '',
            mealImageUrl: selectedMeal.meal?.imageUrl ?? '',
            mealType: selectedMeal.meal?.type ?? 'SPECIAL',
        });
    }

    configuredMenuCourses.sort(({ index: i1 }: ConfiguredMenuCourse, { index: i2 }: ConfiguredMenuCourse) => i1 - i2);

    const saveConfiguredMenuSuccess: boolean = await dataSourceAdapter.configuredMenuRepository.insertOne({
        bookingRequestId,
        menuId: menu.menuId,
        title: menu.title,
        description: menu.description,
        greetingFromKitchen: menu.greetingFromKitchen,
        // kitchenId: menu.kitchen?.kitchenId,
        courses: configuredMenuCourses,
    });

    return saveConfiguredMenuSuccess;
}
