import { type MealType } from '../shared';

export interface CreateOneMealRequest {
    title: string;
    description: string;
    type: MealType;
}
