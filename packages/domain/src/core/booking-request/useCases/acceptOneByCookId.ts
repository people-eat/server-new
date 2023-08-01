import { Authorization, type DataSource, type Logger, type PaymentProvider } from '../../..';
import { type DBBookingRequest } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';

export interface AcceptOneBookingRequestByCookIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId };
}

// probably does not belong in this file
export function calculateMenuPrice(
    adultParticipants: number,
    underagedParticipants: number,
    basePrice: number,
    basePriceCustomers: number,
    pricePerAdult: number,
    pricePerUnderaged?: number,
): number {
    if (adultParticipants + underagedParticipants <= basePriceCustomers) return basePrice;

    if (!pricePerUnderaged) return basePrice + (adultParticipants + underagedParticipants - basePriceCustomers) * pricePerAdult;

    if (adultParticipants - basePriceCustomers >= 0)
        return basePrice + (adultParticipants - basePriceCustomers) * pricePerAdult + underagedParticipants * pricePerUnderaged;

    return (underagedParticipants - basePriceCustomers - adultParticipants) * pricePerUnderaged + basePrice;
}

export async function acceptOneByCookId({
    dataSourceAdapter,
    paymentAdapter,
    logger,
    context,
    request,
}: AcceptOneBookingRequestByCookIdInput): Promise<boolean> {
    const { cookId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted === true) return false;

    const success: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { cookId, bookingRequestId },
        { cookAccepted: true },
    );

    // const configuredMenu: ConfiguredMenu | undefined = await dataSourceAdapter.configuredMenuRepository.findOne({ bookingRequestId });

    const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntent({
        currencyCode: bookingRequest.currencyCode,
        amount: bookingRequest.amount,
        userId: bookingRequest.userId,
        setupIntentId: bookingRequest.paymentData.setupIntentId,
    });

    if (!paymentSuccess) return false;

    await dataSourceAdapter.chatMessageRepository.insertOne({
        chatMessageId: createNanoId(),
        bookingRequestId,
        message: 'Accepted the Booking Request',
        generated: true,
        createdBy: cookId,
        createdAt: new Date(),
    });

    return success;
}
