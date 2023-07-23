import { type NanoId } from '../shared';

export interface CreateOneConfiguredMenuRequest {
    menuId: NanoId;
    courses: { courseId: string; mealId: string }[];
}
