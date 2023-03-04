import { MealType } from '../shared.js';

export interface ConfiguredMenu {
    bookingRequestId: string;
    menuId: string;
    title: string;
    description: string;
    greetingFromKitchen: boolean;
    kitchenId?: string;
    courses: {
        index: number;
        title: string;
        mealTitle: string;
        mealDescription: string;
        mealImageUrl?: string;
        mealType: MealType;
    }[];
}
