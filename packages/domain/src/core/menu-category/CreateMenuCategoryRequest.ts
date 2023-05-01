import { type NanoId } from '../shared';

export interface CreateMenuCategoryRequest {
    menuId: NanoId;
    categoryId: NanoId;
}
