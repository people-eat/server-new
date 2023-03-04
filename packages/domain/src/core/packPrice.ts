import { CurrencyCode, Price } from './shared.js';

export default function packPrice<T extends { amount: number; currencyCode: CurrencyCode }>({
    amount,
    currencyCode,
    ...rest
}: T): Omit<T, 'amount' | 'currencyCode'> & { price: Price } {
    return {
        ...rest,
        price: {
            amount,
            currencyCode,
        },
    };
}
