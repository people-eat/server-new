import { type CreateOneCourseRequest } from '../course';
import { type CurrencyCode, type NanoId } from '../shared';

export interface CreateOneMenuRequest {
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
    courses?: CreateOneCourseRequest[];
    categoryIds?: NanoId[];
}
