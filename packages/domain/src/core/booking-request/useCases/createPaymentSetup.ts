import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export type UserBookingRequestCreatePaymentSetupResponse =
    | UserBookingRequestCreatePaymentSetupSuccessResponse
    | UserBookingRequestCreatePaymentSetupFailedResponse;

interface UserBookingRequestCreatePaymentSetupSuccessResponse {
    stripeClientSecret: string;
}
interface UserBookingRequestCreatePaymentSetupFailedResponse {
    reason: string;
}

export interface CreatePaymentSetupInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; bookingRequestId: NanoId };
}

export async function createPaymentSetup({
    runtime,
    context,
    request,
}: CreatePaymentSetupInput): Promise<UserBookingRequestCreatePaymentSetupResponse> {
    const { dataSourceAdapter, logger, paymentAdapter } = runtime;
    const { userId, bookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const [user, bookingRequest] = await Promise.all([
        dataSourceAdapter.userRepository.findOne({ userId }),
        dataSourceAdapter.bookingRequestRepository.findOne({ userId, bookingRequestId }),
    ]);

    if (!user || !bookingRequest) {
        return {
            reason: 'createPaymentSetup - Did not find user or booking request',
        };
    }

    const paymentData: { setupIntentId: string; clientSecret: string } | undefined = await paymentAdapter.STRIPE.createSetupIntent({
        user,
    });

    if (!paymentData) {
        return {
            reason: 'createPaymentSetup - Did not receive payment data from stripe',
        };
    }

    return {
        stripeClientSecret: paymentData.clientSecret,
    };
}
