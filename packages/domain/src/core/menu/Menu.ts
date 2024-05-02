import { type Course } from '../course';
import { type CurrencyCode, type NanoId } from '../shared';

export interface Menu {
    menuId: NanoId;
    cookId: NanoId;
    imageUrl?: string;
    isVisible: boolean;
    title: string;
    description: string;
    preparationTime: number;
    kitchenId?: NanoId;
    greetingFromKitchen?: string;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number;
    currencyCode: CurrencyCode;
    createdAt: Date;
    courses?: Course[];
}
