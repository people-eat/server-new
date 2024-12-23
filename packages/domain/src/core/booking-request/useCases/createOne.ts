import moment from 'moment';
import { Authorization, type Course, type MealOption, type PublicMenu } from '../../..';
import { type Context } from '../../../authorization';
import { type DBGiftCardPromoCode, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { calculateMenuPrice } from '../../calculateMenuPrice';
import { type ConfiguredMenuCourse } from '../../configured-menu';
import { findAllCourses } from '../../public-menu/useCases/findAllCourses';
import { findOne as findOnePublicMenu } from '../../public-menu/useCases/findOne';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import {
    isCreateOneMenuBookingRequestRequest,
    type CreateOneBookingRequestRequest,
    type CreateOneMenuBookingRequestRequest,
    type UserCreateOneBookingRequestResponse,
} from '../CreateOneBookingRequestRequest';

export interface CreateOneBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneBookingRequestRequest & { userId: NanoId };
}

async function persistMenuBookingRequest(
    runtime: Runtime,
    context: Context,
    bookingRequestId: NanoId,
    menuBookingRequest: CreateOneMenuBookingRequestRequest & { userId: NanoId },
    paymentData: { setupIntentId: string; clientSecret: string },
): Promise<boolean> {
    const { dataSourceAdapter, logger } = runtime;
    const {
        userId,
        cookId,
        location,
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        occasion,
        travelExpensesAmount,
        configuredMenu,
        giftCardPromoCodeId,
    } = menuBookingRequest;

    const publicMenu: PublicMenu | undefined = await findOnePublicMenu({
        dataSourceAdapter,
        logger,
        context,
        request: { menuId: configuredMenu.menuId },
    });

    const courses: Course[] | undefined = await findAllCourses({
        dataSourceAdapter,
        logger,
        context,
        request: { menuId: configuredMenu.menuId },
    });

    if (!publicMenu || !courses) return false;

    const menuPrice: number = calculateMenuPrice(
        adultParticipants,
        children,
        publicMenu.basePrice,
        publicMenu.basePriceCustomers,
        publicMenu.pricePerAdult,
        publicMenu.pricePerChild,
    );

    let giftCardPromoCode: DBGiftCardPromoCode | undefined;

    if (giftCardPromoCodeId) {
        const found: DBGiftCardPromoCode | undefined = await dataSourceAdapter.giftCardPromoCodeRepository.findOne({
            giftCardPromoCodeId,
        });

        if (!found)
            logger.info(`Booking request ${bookingRequestId}. Tried to apply promo code ${giftCardPromoCodeId}, but didn't find one in DB`);
        else if (new Date(found.expiresAt) < new Date()) {
            logger.info(
                `Booking request ${bookingRequestId}. Tried to apply promo code ${giftCardPromoCodeId}, found ${found}, bit it is already expired`,
            );
        } else giftCardPromoCode = found;
    }

    const totalAmountUser: number = giftCardPromoCode
        ? (menuPrice + menuPrice * 0.04 + travelExpensesAmount - giftCardPromoCode.amount + 25) / (1 - 0.015)
        : (menuPrice + menuPrice * 0.04 + travelExpensesAmount + 25) / (1 - 0.015);
    const totalAmountCook: number = Math.round(menuPrice * ((100 - 18) / 100)) + travelExpensesAmount;

    logger.info(
        `In persistMenuBookingRequest: ${JSON.stringify({
            giftCardPromoCodeIdInRequest: giftCardPromoCodeId,
            giftCardPromoCodeRetrievedFromDB: giftCardPromoCode,
            dbQueryPayload: { giftCardPromoCodeId },
            bookingRequestId,
            inputs: {
                adultParticipants,
                children,
                publicMenu,
            },
            results: {
                menuPrice,
                totalAmountUser,
                totalAmountCook,
            },
        })}`,
    );

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        userId,
        cookId,
        userAccepted: true,
        cookAccepted: undefined,
        latitude: location.latitude,
        longitude: location.longitude,
        locationText: location.text ?? '',
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        totalAmountCook,
        totalAmountUser,
        currencyCode: 'EUR',
        fee: 22,
        occasion: occasion.trim(),
        createdAt: new Date(),
        // info: don't use the one right out of the request. It could reference one that has not been applied. i.e. already expired
        giftCardPromoCodeId: giftCardPromoCode?.giftCardPromoCodeId,
        paymentData: { ...paymentData, provider: 'STRIPE', confirmed: false, unlocked: false },
        travelExpensesAmount,
        // costBreakdown: {
        //     lineItems: [
        //         { type: 'MENU_PRICE', title: 'Menüpreis', price: { amount: menuPrice, currencyCode: 'EUR' } },
        //         { type: 'TRAVEL_EXPENSES', title: 'Reisekosten', price: { amount: travelExpensesAmount, currencyCode: 'EUR' } },
        //     ],
        //     totalPriceCook: { amount: totalAmountCook, currencyCode: 'EUR' },
        //     totalPriceUser: { amount: totalAmountUser, currencyCode: 'EUR' },
        // },
    });

    if (!success) return false;

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
        menuId: publicMenu.menuId,
        title: publicMenu.title,
        description: publicMenu.description,
        greetingFromKitchen: publicMenu.greetingFromKitchen,
        kitchenId: publicMenu.kitchen?.kitchenId,
        courses: configuredMenuCourses,
    });

    if (!saveConfiguredMenuSuccess) return false;

    return true;
}

// eslint-disable-next-line max-statements
export async function createOne({ runtime, context, request }: CreateOneBookingRequestInput): Promise<UserCreateOneBookingRequestResponse> {
    const fee: number = 22;
    const { dataSourceAdapter, paymentAdapter, logger, publisher } = runtime;
    const bookingRequestId: NanoId = createNanoId();
    const { userId, cookId, location, dateTime, preparationTime, duration, adultParticipants, children, occasion, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const daysUntilEventStart: number = moment(dateTime).diff(moment(), 'days');

    if (daysUntilEventStart < 1) {
        logger.info('Received booking request. Is in less than 1 day. Declined the request creation.');
        return {
            reason: 'Received booking request. Is in less than 1 day. Declined the request creation.',
        };
    }

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) {
        logger.info('Received booking request. Could not find customer user. Declined the request creation.');
        return {
            reason: 'Received booking request. Could not find customer user. Declined the request creation.',
        };
    }

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) {
        logger.info('Received booking request. Could not find cook user. Declined the request creation.');
        return {
            reason: 'Received booking request. Could not find cook user. Declined the request creation.',
        };
    }

    const paymentData: { setupIntentId: string; clientSecret: string } | undefined = await paymentAdapter.STRIPE.createSetupIntent({
        user,
    });

    if (!paymentData) {
        logger.info('Received booking request. Could not create payment data. Declined the request creation.');
        return {
            reason: 'Received booking request. Could not create payment data. Declined the request creation.',
        };
    }

    const persistSuccess: boolean = isCreateOneMenuBookingRequestRequest(request)
        ? await persistMenuBookingRequest(runtime, context, bookingRequestId, request, paymentData)
        : await dataSourceAdapter.bookingRequestRepository.insertOne({
              bookingRequestId,
              userId,
              cookId,
              userAccepted: true,
              cookAccepted: undefined,
              latitude: location.latitude,
              longitude: location.longitude,
              locationText: location.text ?? '',
              dateTime,
              preparationTime,
              duration,
              adultParticipants,
              children,
              totalAmountUser: request.price.amount + request.travelExpensesAmount,
              totalAmountCook: Math.round((request.price.amount * (100 - fee)) / 100) + request.travelExpensesAmount,
              travelExpensesAmount: request.travelExpensesAmount,
              currencyCode: 'EUR',
              fee: 22,
              occasion: occasion.trim(),
              kitchenId: request.kitchenId,
              paymentData: { ...paymentData, provider: 'STRIPE', confirmed: false, unlocked: false },
              createdAt: new Date(),
          });

    if (!persistSuccess) {
        logger.info('Received booking request. Could not store booking request. Declined the request creation.');
        return {
            reason: 'Received booking request. Could not store booking request. Declined the request creation.',
        };
    }

    await publisher.publish(`session-update-${context.sessionId}`, { sessionUpdates: context });

    const clearedMessage: string = message.trim();

    if (clearedMessage) {
        const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
            chatMessageId: createNanoId(),
            bookingRequestId,
            message: clearedMessage,
            generated: false,
            createdBy: userId,
            createdAt: new Date(),
        });

        if (!messageSuccess) logger.error('Creating message did fail for booking request with id: ' + bookingRequestId);
    }

    return {
        bookingRequestId,
    };
}
