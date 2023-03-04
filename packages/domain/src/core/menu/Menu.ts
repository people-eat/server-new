import { CurrencyCode } from '../shared.js';

export interface Menu {
    menuId: string;
    cookId: string;
    isVisible: boolean;
    title: string;
    description: string;
    preparationTime: number;
    kitchenId?: string;
    greetingFromKitchen: boolean;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number;
    currencyCode: CurrencyCode;
    createdAt: Date;
}
