import { Authorization } from '../../..';
import { type DBGiftCardPromoCode } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type GiftCard } from '../GiftCard';

export interface FindManyGiftCardPromoCodesInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({
    runtime: { dataSourceAdapter, logger },
    context,
}: FindManyGiftCardPromoCodesInput): Promise<GiftCard[] | undefined> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const giftCardPromoCodes: DBGiftCardPromoCode[] | undefined = await dataSourceAdapter.giftCardPromoCodeRepository.findAll();

    if (!giftCardPromoCodes) return;

    return [];

    // return giftCardPromoCodes.map((giftCardPromoCode: DBGiftCardPromoCode) => ({
    //     ...giftCardPromoCode,
    //     balance: {
    //         amount: giftCardPromoCode.amount,
    //         currencyCode: giftCardPromoCode.currencyCode,
    //     },
    // }));
}
