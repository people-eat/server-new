import { type MealType, type NanoId } from '../shared';

export interface Meal {
    mealId: NanoId;
    cookId: NanoId;
    title: string;
    description: string;
    imageUrl?: string;
    type: MealType;
    createdAt: Date;
}
