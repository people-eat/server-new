import { type NanoId } from '../shared';

export interface Course {
    courseId: NanoId;
    menuId: NanoId;
    cookId: NanoId;
    index: number;
    type: string;
}
