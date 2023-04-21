import { type Meal } from '../meal/Meal';
import { type NanoId } from '../shared';

export interface MealOption {
    courseId: NanoId;
    cookId: NanoId;
    index: number;
    mealId: NanoId;
    meal?: Meal;
}
