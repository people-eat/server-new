import { customerPaymentAnnouncement } from '@people-eat/server-adapter-email-template';
import moment from 'moment';
import { type DBBookingRequest, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type TimeTriggeredTask } from '../TimeTriggeredTask';

// eslint-disable-next-line max-statements
export async function handleTimeTriggeredTask(runtime: Runtime, timeTriggeredTask: TimeTriggeredTask): Promise<void> {
    const { dataSourceAdapter, paymentAdapter, emailAdapter } = runtime;

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT') {
        runtime.logger.debug('Pull payment trigger was called');
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

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT') {
        runtime.logger.debug('Announce pull payment was called');
        const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
        });

        if (!bookingRequest) return;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

        if (!user || !user.emailAddress) return;

        const emailSuccess: boolean = await emailAdapter.sendToOne(
            'PeopleEat',
            user.emailAddress,
            'Deine Zahlung steht bevor',
            customerPaymentAnnouncement({
                customer: {
                    firstName: user.firstName,
                    profilePictureUrl: user.profilePictureUrl ?? '',
                },
                bookingRequest: {
                    bookingRequestId: bookingRequest.bookingRequestId,
                    occasion: bookingRequest.occasion,
                    date: moment(bookingRequest.dateTime).format('L'),
                    time: moment(bookingRequest.dateTime).format('LT'),
                    price: {
                        total: bookingRequest.amount,
                        currency: bookingRequest.currencyCode,
                    },
                },
            }),
        );

        if (!emailSuccess) return;

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }
}
