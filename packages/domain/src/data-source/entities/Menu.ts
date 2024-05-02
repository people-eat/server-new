import { type Menu } from '../../core/menu/Menu';
import { type NanoId } from '../../core/shared';

export interface DBMenu extends Omit<Menu, 'imageUrl'> {
    keyMealOptionCourseId?: NanoId;
    keyMealOptionIndex?: number;
}
