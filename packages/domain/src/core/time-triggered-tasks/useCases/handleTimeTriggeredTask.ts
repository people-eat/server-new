import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type TimeTriggeredTask } from '../TimeTriggeredTask';

export async function handleTimeTriggeredTask(runtime: Runtime, timeTriggeredTask: TimeTriggeredTask): Promise<void> {
    const { dataSourceAdapter, paymentAdapter, emailAdapter } = runtime;

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT') {
        const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
        });

        if (!bookingRequest) return;

        const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntent({
            currencyCode: bookingRequest.currencyCode,
            amount: bookingRequest.amount,
            userId: bookingRequest.userId,
            setupIntentId: bookingRequest.paymentData.setupIntentId,
        });

        if (!paymentSuccess) return;
    }

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT') {
        const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
        });

        if (!bookingRequest) return;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

        if (!user || !user.emailAddress) return;

        await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Ankpndigung Zahlungseinzug',
            'Wir werden Geld für deine Buchung einziehen',
        );
    }
}
