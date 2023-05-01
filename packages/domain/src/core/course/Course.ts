import { type MealOption } from '../meal-option';
import { type NanoId } from '../shared';

export interface Course {
    courseId: NanoId;
    menuId: NanoId;
    cookId: NanoId;
    index: number;
    title: string;
    mealOptions?: MealOption[];
}
