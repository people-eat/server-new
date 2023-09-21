import { cookBookingRequestCookConfirmation, cookBookingRequestCustomerConfirmation } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import {
    Authorization,
    type Course,
    type DataSource,
    type Email,
    type Logger,
    type MealOption,
    type PaymentProvider,
    type PublicMenu,
} from '../../..';
import { type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type ConfiguredMenuCourse } from '../../configured-menu';
import { findAllCourses } from '../../public-menu/useCases/findAllCourses';
import { findOne as findOnePublicMenu } from '../../public-menu/useCases/findOne';
import { type NanoId } from '../../shared';
import { type CreateOneBookingRequestRequest } from '../CreateOneBookingRequestRequest';

export interface CreateOneBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    webAppUrl: string;
    emailAdapter: Email.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneBookingRequestRequest & { userId: NanoId };
}

// eslint-disable-next-line max-statements
export async function createOne({
    dataSourceAdapter,
    webAppUrl,
    emailAdapter,
    paymentAdapter,
    logger,
    context,
    request,
}: CreateOneBookingRequestInput): Promise<{
    success: boolean;
    clientSecret: string;
}> {
    const {
        userId,
        cookId,
        location,
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        price,
        occasion,
        message,
        kitchenId,
        configuredMenu,
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const daysUntilEventStart: number = moment(dateTime).diff(moment(), 'days');

    if (daysUntilEventStart < 7) return { success: false, clientSecret: '' };

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return { success: false, clientSecret: '' };

    const cookUser: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!cookUser) return { success: false, clientSecret: '' };

    const bookingRequestId: NanoId = createNanoId();

    const paymentData: { setupIntentId: string; clientSecret: string } | undefined = await paymentAdapter.STRIPE.createSetupIntent();

    if (!paymentData) return { success: false, clientSecret: JSON.stringify(paymentData) };

    const { clientSecret } = paymentData;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.insertOne({
        bookingRequestId,
        userId,
        cookId,
        userAccepted: true,
        cookAccepted: undefined,
        latitude: location.latitude,
        longitude: location.longitude,
        dateTime,
        preparationTime,
        duration,
        adultParticipants,
        children,
        amount: price.amount,
        currencyCode: price.currencyCode,
        fee: 18,
        occasion: occasion.trim(),
        kitchenId,
        createdAt: new Date(),
        paymentData: { ...paymentData, provider: 'STRIPE' },
    });

    if (!success) return { success: false, clientSecret };

    const messageSuccess: boolean = await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: message.trim(),
        generated: false,
        createdBy: userId,
        createdAt: new Date(),
    });

    if (!messageSuccess) logger.info('creating message did fail');

    if (user.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Bestätigung Deiner Buchungsanfrage',
            cookBookingRequestCustomerConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    occasion,
                    children,
                    adults: adultParticipants,
                    location: location.text ?? '',
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: price.amount / (children + adultParticipants),
                        total: price.amount,
                        currency: price.currencyCode,
                    },
                },
                chatMessage: message.trim(),
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    if (cookUser.emailAddress) {
        const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            cookUser.emailAddress,
            `Neue Buchungsanfrage ${user.firstName}`,
            cookBookingRequestCookConfirmation({
                webAppUrl,
                customer: {
                    firstName: user.firstName,
                },
                cook: {
                    firstName: cookUser.firstName,
                    profilePictureUrl: cookUser.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    occasion,
                    children,
                    adults: adultParticipants,
                    location: location.text ?? '',
                    date: dateTime.toDateString(),
                    time: moment(dateTime).format('LT'),
                    price: {
                        perPerson: price.amount / (children + adultParticipants),
                        total: price.amount,
                        currency: price.currencyCode,
                    },
                },
                chatMessage: message.trim(),
            }),
        );

        if (!customerEmailSuccess) logger.info('sending email failed');
    }

    if (!configuredMenu) return { success: true, clientSecret };

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

    if (!publicMenu || !courses) return { success: false, clientSecret };

    const configuredMenuCourses: ConfiguredMenuCourse[] = [];

    for (const configuredCourse of configuredMenu.courses) {
        const course: Course | undefined = courses.find((c: Course) => c.courseId === configuredCourse.courseId);
        if (!course) return { success: false, clientSecret };
        const selectedMeal: MealOption | undefined = course.mealOptions?.find(
            (mealOption: MealOption) => mealOption.mealId === configuredCourse.mealId,
        );
        if (!selectedMeal) return { success: false, clientSecret };
        configuredMenuCourses.push({
            index: course.index,
            title: course.title,
            mealTitle: selectedMeal.meal?.title ?? '',
            mealDescription: selectedMeal.meal?.description ?? '',
            mealImageUrl: selectedMeal.meal?.imageUrl ?? '',
            mealType: selectedMeal.meal?.type ?? 'SPECIAL',
        });
    }

    const saveConfiguredMenuSuccess: boolean = await dataSourceAdapter.configuredMenuRepository.insertOne({
        bookingRequestId,
        menuId: publicMenu.menuId,
        title: publicMenu.title,
        description: publicMenu.description,
        greetingFromKitchen: publicMenu.greetingFromKitchen,
        kitchenId: publicMenu.kitchen?.kitchenId,
        courses: configuredMenuCourses,
    });

    return { success: saveConfiguredMenuSuccess, clientSecret };
}
