import { Authorization, type DataSource, type Logger, type PaymentProvider } from '../../..';
import { type DBBookingRequest, type DBCook } from '../../../data-source';
import { type CookPayoutMethod } from '../../cook';
import { type NanoId } from '../../shared';

export interface UnlockPaymentInput {
    dataSourceAdapter: DataSource.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { bookingRequestId: NanoId };
}

// eslint-disable-next-line max-statements
export async function unlockPayment({ dataSourceAdapter, paymentAdapter, logger, context, request }: UnlockPaymentInput): Promise<boolean> {
    const { bookingRequestId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({ bookingRequestId });

    if (!bookingRequest) return false;

    if (bookingRequest.cookAccepted !== true) {
        logger.info(`Tried to unlock payment for booking request with id: ${bookingRequestId}, but cook didn't accept yet`);
        return false;
    }

    if (bookingRequest.userAccepted !== true) {
        logger.info(`Tried to unlock payment for booking request with id: ${bookingRequestId}, but user didn't accept yet`);
        return false;
    }

    if (bookingRequest.paymentData.unlocked === true) {
        logger.info(`Tried to unlock payment for booking request with id: ${bookingRequestId}, but payment has already been unlocked`);
        return false;
    }

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: bookingRequest.cookId });

    if (!cook) {
        logger.info(`Tried to unlock payment for booking request with id: ${bookingRequestId}, but cook didn't exist`);
        return false;
    }

    const payoutMethod: CookPayoutMethod | undefined = cook.payoutMethods[0];

    if (!payoutMethod) {
        logger.info(`Tried to unlock payment for booking request with id: ${bookingRequestId}, but cook didn't have payout methods`);
        return false;
    }

    const transferSuccess: boolean = await paymentAdapter.STRIPE.transferPaymentToCookAccount({
        accountId: payoutMethod.stripeAccountId,
        price: {
            amount: bookingRequest.amount,
            currencyCode: bookingRequest.currencyCode,
        },
    });

    if (!transferSuccess) {
        logger.info(`Tried to unlock payment for booking request with id: ${bookingRequestId}, but stripe request failed`);
        return false;
    }

    const updateSuccess: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { bookingRequestId },
        { paymentData: { ...bookingRequest.paymentData, unlocked: true } },
    );

    return updateSuccess;
}
