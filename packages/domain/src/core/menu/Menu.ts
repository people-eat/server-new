import { type CurrencyCode, type NanoId } from '../shared';

export interface Menu {
    menuId: NanoId;
    cookId: NanoId;
    isVisible: boolean;
    title: string;
    description: string;
    preparationTime: number;
    kitchenId?: NanoId;
    greetingFromKitchen: boolean;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number;
    currencyCode: CurrencyCode;
    createdAt: Date;
}
