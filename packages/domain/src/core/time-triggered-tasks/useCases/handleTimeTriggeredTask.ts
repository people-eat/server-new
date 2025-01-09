import { giftCardReceived } from '@people-eat/server-adapter-email-template';
import moment, { type Moment } from 'moment';
import { type DBBookingRequest, type DBCook, type DBGiftCard, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type TimeTriggeredTask } from '../TimeTriggeredTask';

// const handlers: Record<string, (runtime: Runtime, task: TimeTriggeredTaskVariation) => Promise<void>> = {
//     TIME_TRIGGERED_TASK_PULL_PAYMENT: async (runtime: Runtime, task: TimeTriggeredTaskPullPayment) => {
//         runtime;
//         task;
//         console.log('');
//     },
//     TIME_TRIGGERED_TASK_PULL_PAYMENT_ANNOUNCEMENT: async (runtime: Runtime, task: TimeTriggeredTaskPullPaymentAnnouncement) => {
//         runtime;
//         task;
//         console.log('');
//     },
//     TIME_TRIGGERED_TASK_SEND_GIFT_CARD: async (runtime: Runtime, task: TimeTriggeredTaskSendGiftCard) => {
//         runtime;
//         task;
//         console.log('');
//     },
// };

// eslint-disable-next-line max-statements
export async function handleTimeTriggeredTask(runtime: Runtime, timeTriggeredTask: TimeTriggeredTask): Promise<void> {
    const { dataSourceAdapter, paymentAdapter, emailAdapter } = runtime;

    // await handlers[timeTriggeredTask.task.type]?.(runtime, timeTriggeredTask.task);

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_PULL_PAYMENT') {
        runtime.logger.debug('Pull payment trigger was called');
        const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
        });

        if (!bookingRequest) return;

        if (!bookingRequest.paymentData) return;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

        if (!user) return;

        const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({
            cookId: bookingRequest.cookId,
        });

        if (!cook) return;

        const [payoutMethod] = cook.payoutMethods ?? [];

        if (!payoutMethod?.active) {
            runtime.logger.error('Time triggered pull payment task failed because cook had no payout methods');
            return;
        }

        const paymentSuccess: boolean = await paymentAdapter.STRIPE.createPaymentIntentFromSetupIntent({
            currencyCode: bookingRequest.currencyCode,
            pullAmount: bookingRequest.totalAmountUser,
            payoutAmount: bookingRequest.totalAmountCook,
            setupIntentId: bookingRequest.paymentData.setupIntentId,
            destinationAccountId: payoutMethod.stripeAccountId,
            bookingRequestId: timeTriggeredTask.task.bookingRequestId,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
            },
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

        const pullPaymentDate: Moment = moment(bookingRequest.dateTime).subtract(14, 'days');
        const customerProfileGlobalBookingRequestsUrl: string =
            runtime.webAppUrl + `/profile/bookings/s/${bookingRequest.bookingRequestId}`;
        const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
        if (user.emailAddress) {
            await runtime.klaviyoEmailAdapter.sendBookingRequestPaymentAnnouncementForCustomer({
                recipient: {
                    userId: user.userId,
                    emailAddress: user.emailAddress,
                    phoneNumber: user.phoneNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                data: {
                    bookingRequestId: bookingRequest.bookingRequestId,
                    user: {
                        firstName: user.firstName,
                        url: customerProfileGlobalBookingRequestsUrl,
                        formattedPrice: formatPrice(bookingRequest.totalAmountUser, bookingRequest.currencyCode),
                    },
                    occasion: bookingRequest.occasion,
                    pullPaymentDate: pullPaymentDate.format('L'),
                },
            });
        }

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }

    if (timeTriggeredTask.task.type === 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD') {
        const giftCardId: NanoId = timeTriggeredTask.task.giftCardId;
        const giftCard: DBGiftCard | undefined = await dataSourceAdapter.giftCardRepository.findOne({ giftCardId });
        if (!giftCard) return;

        const { redeemCode, userId, buyer, occasion, recipient, message, initialBalanceAmount, expiresAt } = giftCard;

        const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
        const formattedPrice: string = formatPrice(giftCard.initialBalanceAmount, '€');

        if (userId && recipient.deliveryInformation) {
            const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });
            if (!user || !user.emailAddress) return;

            await runtime.klaviyoEmailAdapter.sendGiftCardDelivery({
                recipient: {
                    userId,
                    emailAddress: user.emailAddress,
                    phoneNumber: user.phoneNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                data: {
                    recipient: {
                        firstName: recipient.firstName,
                    },
                    buyer: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    message: message,
                    formattedPrice,
                    redeemCode,
                },
            });

            await emailAdapter.sendToOne(
                'PeopleEat',
                recipient.deliveryInformation.emailAddress,
                `${user.firstName} hat dir ein Geschenk geschickt`,
                giftCardReceived({
                    buyer: { firstName: user.firstName, lastName: user.lastName },
                    occasion,
                    message,
                    recipient,
                    balance: initialBalanceAmount,
                    redeemCode,
                    formattedExpirationDate: moment(expiresAt).format('L'),
                }),
            );
        }

        if (buyer && recipient.deliveryInformation) {
            await runtime.klaviyoEmailAdapter.sendGiftCardDeliveryToEmailAddress({
                emailAddress: buyer.emailAddress,
                data: {
                    recipient: {
                        firstName: recipient.firstName,
                    },
                    buyer: {
                        firstName: buyer.firstName,
                        lastName: buyer.lastName,
                    },
                    message: message,
                    formattedPrice,
                    redeemCode,
                },
            });

            await emailAdapter.sendToOne(
                'PeopleEat',
                recipient.deliveryInformation.emailAddress,
                `${buyer.firstName} hat dir ein Geschenk geschickt`,
                giftCardReceived({
                    buyer,
                    occasion,
                    message,
                    recipient,
                    balance: initialBalanceAmount,
                    redeemCode,
                    formattedExpirationDate: moment(expiresAt).format('L'),
                }),
            );
        }

        await dataSourceAdapter.timeTriggeredTaskRepository.deleteOne({ timeTriggeredTaskId: timeTriggeredTask.timeTriggeredTaskId });
    }
}
