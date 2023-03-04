import { Authorization, Database, Logger, Payment } from '../../index.js';
import createNanoId from '../../utils/createNanoId.js';
import { CookSpecificFee } from '../cook-specific-fee/CookSpecificFee.js';
import { CustomerFeeUpdate } from '../customer-fee-update/CustomerFeeUpdate.js';
import { Menu } from '../menu/Menu.js';
import { Price } from '../shared.js';
import { CreateOneBookingRequestRequest } from './CreateOneBookingRequestRequest.js';

export interface CreateOneBookingRequestInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    paymentAdapter: Payment.PaymentProviderAdapter;
    context: Authorization.Context;
    request: { userId: string; bookingRequest: CreateOneBookingRequestRequest };
}

// eslint-disable-next-line max-statements
export async function createOneBookingRequest({
    databaseAdapter,
    logger,
    paymentAdapter,
    context,
    request: { userId, bookingRequest },
}: CreateOneBookingRequestInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    const customerFeeUpdate: CustomerFeeUpdate | undefined = await databaseAdapter.customerFeeUpdateRepository.findOne({});

    if (!customerFeeUpdate) return false;

    const { fee: customerFee } = customerFeeUpdate;

    const cookFee: CookSpecificFee | undefined = await databaseAdapter.cookSpecificFeeRepository.findOne({ cookId: bookingRequest.cookId });

    let price: Price | undefined = bookingRequest.price;

    let menu: Menu | undefined;

    if (bookingRequest.configuredMenu) {
        menu = await databaseAdapter.menuRepository.findOne({ menuId: bookingRequest.configuredMenu.menuId });

        if (!menu) return false;

        let amount: number = 0;
        const totalParticipants: number = bookingRequest.adultParticipants + bookingRequest.children;
        if (totalParticipants <= menu.basePriceCustomers) amount = menu.basePrice;
        else amount = menu.basePrice + (totalParticipants - menu.basePriceCustomers) * menu.pricePerAdult;

        price = { amount, currencyCode: menu.currencyCode };
    }

    if (!price) return false;

    if (bookingRequest.paymentProvider === 'STRIPE') {
        const result: Payment.CreateStripePaymentIntentResponse | undefined = await paymentAdapter.createStripePaymentIntent(price);

        if (!result) return false;

        const { paymentIntentId, clientSecret } = result;
    }

    const bookingRequestId: string = createNanoId();

    const success: boolean = await databaseAdapter.bookingRequestRepository.insertOne({
        bookingRequestId: bookingRequestId,
        userId,
        cookId: bookingRequest.cookId,
        latitude: bookingRequest.location.latitude,
        longitude: bookingRequest.location.longitude,
        dateTime: bookingRequest.dateTime,
        preparationTime: menu?.preparationTime ?? 0,
        duration: bookingRequest.duration,
        adultParticipants: bookingRequest.adultParticipants,
        children: bookingRequest.children,
        amount: price.amount,
        currencyCode: price.currencyCode,
        customerFee: customerFee,
        cookFee: cookFee?.fee ?? 18,
        occasion: bookingRequest.occasion,
        message: '',
        createdAt: new Date(),
    });

    return success;
}
