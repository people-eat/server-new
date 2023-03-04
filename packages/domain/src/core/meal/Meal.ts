import { MealType } from '../shared.js';

export interface Meal {
    mealId: string;
    cookId: string;
    title: string;
    description: string;
    imageUrl?: string;
    type: MealType;
    createdAt: Date;
}
