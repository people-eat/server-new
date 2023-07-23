import { type MealType, type NanoId } from '../shared';

export interface ConfiguredMenu {
    bookingRequestId: NanoId;
    menuId?: NanoId;
    title: string;
    description: string;
    greetingFromKitchen?: string;
    kitchenId?: NanoId;
    courses: ConfiguredMenuCourse[];
}

export interface ConfiguredMenuCourse {
    index: number;
    title: string;
    mealTitle: string;
    mealDescription: string;
    mealImageUrl?: string;
    mealType: MealType;
}
