import { MealType } from '../shared.js';

export interface CreateOneMealRequest {
    title: string;
    description: string;
    imageUrl?: string;
    type: MealType;
}
