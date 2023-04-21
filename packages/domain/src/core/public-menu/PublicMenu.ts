import { type Category } from '../category';
import { type Kitchen } from '../kitchen';
import { type PublicCook } from '../public-cook';
import { type CurrencyCode, type NanoId } from '../shared';

export interface PublicMenu {
    menuId: NanoId;
    title: string;
    description: string;
    preparationTime: number;
    greetingFromKitchen?: string;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number;
    currencyCode: CurrencyCode;
    createdAt: Date;

    cook: PublicCook;
    kitchen?: Kitchen;
    categories: Category[];
}
