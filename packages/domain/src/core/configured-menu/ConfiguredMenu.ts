import { type MealType, type NanoId } from '../shared';

export interface ConfiguredMenu {
    bookingRequestId: NanoId;
    menuId: NanoId;
    title: string;
    description: string;
    greetingFromKitchen: boolean;
    kitchenId?: NanoId;
    courses: {
        index: number;
        title: string;
        mealTitle: string;
        mealDescription: string;
        mealImageUrl?: string;
        mealType: MealType;
    }[];
}
