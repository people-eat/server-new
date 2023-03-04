import { CurrencyCode } from '../shared.js';

export interface CreateOneMenuRequest {
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
}
