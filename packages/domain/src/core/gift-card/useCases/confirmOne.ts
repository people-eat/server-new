import { type Authorization } from '../../..';
import { type DBGiftCard, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { createOneTimeTriggeredTask } from '../../time-triggered-tasks/useCases/createOne';

export interface ConfirmOneGiftCardInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { giftCardId: NanoId };
}

// eslint-disable-next-line max-statements
export async function confirmOne({ runtime, request }: ConfirmOneGiftCardInput): Promise<boolean> {
    const { dataSourceAdapter, paymentAdapter, emailAdapter, klaviyoEmailAdapter, notificationEmailAddresses, logger } = runtime;

    const { giftCardId } = request;

    const giftCard: DBGiftCard | undefined = await dataSourceAdapter.giftCardRepository.findOne({
        giftCardId,
    });

    if (!giftCard) {
        logger.info(`During gift card purchase confirmation: Could not find gift card for giftCardId: ${giftCardId}`);
        return false;
    }

    const paymentIntentId: string = giftCard.paymentData.paymentIntentId;

    const paymentCompleted: boolean = await paymentAdapter.STRIPE.checkPaymentIntentCompleted(paymentIntentId);

    if (!paymentCompleted) {
        logger.info(`During gift card purchase confirmation: Payment intent with id ${paymentIntentId} is not completed`);
        return false;
    }

    const persistingSuccess: boolean = await dataSourceAdapter.giftCardRepository.updateOne(
        { giftCardId },
        { paymentData: { ...giftCard.paymentData, confirmed: true } },
    );

    if (!persistingSuccess) {
        logger.info(`During gift card purchase confirmation: Could not update gift card to status confirmed in own DB`);
        return false;
    }

    const { initialBalanceAmount, userId, buyer, recipient, invoiceAddress } = giftCard;

    const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;
    const formattedPrice: string = formatPrice(giftCard.initialBalanceAmount, '€');

    if (userId) {
        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });
        if (!user || !user.emailAddress) return false;
        await klaviyoEmailAdapter.sendGiftCardPurchaseConfirmation({
            recipient: {
                userId: user.userId,
                emailAddress: user.emailAddress,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            data: {
                occasion: giftCard.occasion,
                recipient: {
                    firstName: giftCard.recipient.firstName,
                },
                formattedPrice,
                automaticDeliveryEnabledLabel: recipient.deliveryInformation ? 'Ja' : 'Nein',
            },
        });
        if (recipient.deliveryInformation) {
            await createOneTimeTriggeredTask(runtime, {
                dueDate: new Date(recipient.deliveryInformation.date),
                task: { type: 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD', giftCardId },
            });
        }

        // admin notification

        emailAdapter
            .sendToMany(
                'PeopleEat Bot',
                notificationEmailAddresses,
                'Ein Gutschein wurde gekauft',
                `Es wurde ein Gutschein im Wert von ${initialBalanceAmount / 100} € gekauft.<br />
                Käufer: ${user.firstName} ${user.lastName}<br />
                Rechnungsadresse: ${invoiceAddress.postCode} ${invoiceAddress.city}, ${invoiceAddress.street} ${
                    invoiceAddress.houseNumber
                },  ${invoiceAddress.country}
        `,
            )
            .then(() => undefined)
            .catch(() => undefined);
    }

    if (buyer) {
        await klaviyoEmailAdapter.sendGiftCardPurchaseConfirmation({
            recipient: {
                userId: 'during-gift-card-purchase',
                emailAddress: buyer.emailAddress,
                phoneNumber: undefined,
                firstName: buyer.firstName,
                lastName: buyer.lastName,
            },
            data: {
                occasion: giftCard.occasion,
                recipient: {
                    firstName: giftCard.recipient.firstName,
                },
                formattedPrice,
                automaticDeliveryEnabledLabel: recipient.deliveryInformation ? 'Ja' : 'Nein',
            },
        });
        if (recipient.deliveryInformation) {
            await createOneTimeTriggeredTask(runtime, {
                dueDate: new Date(recipient.deliveryInformation.date),
                task: { type: 'TIME_TRIGGERED_TASK_SEND_GIFT_CARD', giftCardId },
            });
        }

        // admin notification

        emailAdapter
            .sendToMany(
                'PeopleEat Bot',
                notificationEmailAddresses,
                'Ein Gutschein wurde gekauft',
                `Es wurde ein Gutschein im Wert von ${initialBalanceAmount / 100} € gekauft.<br />
                Käufer: ${buyer.firstName} ${buyer.lastName}<br />
                Rechnungsadresse: ${invoiceAddress.postCode} ${invoiceAddress.city}, ${invoiceAddress.street} ${
                    invoiceAddress.houseNumber
                },  ${invoiceAddress.country}
        `,
            )
            .then(() => undefined)
            .catch(() => undefined);
    }

    return true;
}
