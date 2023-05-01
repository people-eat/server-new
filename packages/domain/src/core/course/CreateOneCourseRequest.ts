import { type CreateOneMealOptionRequest } from '../meal-option';

export interface CreateOneCourseRequest {
    index: number;
    title: string;
    mealOptions?: CreateOneMealOptionRequest[];
}
