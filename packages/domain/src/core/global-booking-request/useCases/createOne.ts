import { globalBookingRequestCustomerConfirmation } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBAllergy, type DBCategory, type DBKitchen, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneGlobalBookingRequestRequest } from '../CreateOneGlobalBookingRequestRequest';

export interface CreateOneGlobalBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneGlobalBookingRequestRequest & { userId: NanoId };
}

// eslint-disable-next-line max-statements
export async function createOne({
    dataSourceAdapter,
    emailAdapter,
    webAppUrl,
    logger,
    context,
    request,
}: CreateOneGlobalBookingRequestInput): Promise<boolean> {
    const {
        adultParticipants,
        children,
        price,
        dateTime,
        duration,
        occasion,
        message,
        kitchenId,
        allergyIds,
        categoryIds,
        location,
        userId,
        phoneNumber,
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const globalBookingRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.globalBookingRequestRepository.insertOne({
        globalBookingRequestId,
        userId,
        adultParticipants,
        children,
        amount: price.amount,
        currencyCode: price.currencyCode,
        dateTime,
        duration,
        occasion: occasion.trim(),
        message: message.trim(),
        kitchenId,
        latitude: location.latitude,
        longitude: location.longitude,
        expiresAt: moment().add(14, 'days').toDate(),
        createdAt: new Date(),
    });

    if (!success) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return false;

    let kitchen: DBKitchen | undefined;

    if (kitchenId) kitchen = await dataSourceAdapter.kitchenRepository.findOne({ kitchenId });

    const allergies: DBAllergy[] = [];

    if (allergyIds) {
        for (const allergyId of allergyIds) {
            const allergy: DBAllergy | undefined = await dataSourceAdapter.allergyRepository.findOne({ allergyId });
            if (allergy) allergies.push(allergy);
        }
    }

    const categories: DBCategory[] = [];

    if (categoryIds) {
        for (const categoryId of categoryIds) {
            const category: DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({ categoryId });
            if (category) categories.push(category);
        }
    }

    const formattedDateTime: string = moment(dateTime).format('MMMM Do YYYY, h:mm a');
    const emailSuccess: boolean = await emailAdapter.sendToMany(
        'Global Booking Request',
        ['yilmaz.cem.2603@gmail.com'],
        `from ${user.firstName} ${user.lastName}`,
        `A new Booking Request was received from <b>${user.firstName} ${
            user.lastName
        }</b><br/><br/><b>When:</b> ${formattedDateTime}<br/><b>Where:</b> ${
            location.text
        }<br/><b>Occasion:</b> ${occasion}<br/><br/><b>Adults:</b> ${adultParticipants}<br/><b>Children:</b> ${children}<br/><br/><b>Budget:</b> ${
            price.amount
        } ${price.currencyCode}<br/><br/><b>Message:</b><br/>${message}<br/><br/><br/><b>Contact:</b><br/>Email Address: ${
            user.emailAddress
        }<br/>Phone Number: ${phoneNumber}<br/><br/>Kitchen: ${kitchen?.title ?? 'any'}<br/><br/>Allergies: ${allergies
            .map(({ title }: DBAllergy) => title)
            .join(', ')}<br/><br/>Categories: ${categories.map(({ title }: DBCategory) => title).join(', ')}`,
    );

    if (!emailSuccess) logger.info('sending email failed');

    if (!user.emailAddress) return true;

    const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
        'Global Booking Request',
        user.emailAddress,
        'was received',
        globalBookingRequestCustomerConfirmation({
            webAppUrl,
            customer: { firstName: user.firstName, profilePictureUrl: user.profilePictureUrl },
            globalBookingRequest: {
                occasion,
                adults: adultParticipants,
                children,
                location: location.text,
                date: dateTime.toDateString(),
                time: dateTime.toTimeString(),
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

    return true;
}
