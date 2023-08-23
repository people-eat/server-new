import { type PublicCook } from '../public-cook';
import { type NanoId } from '../shared';

export interface FavoriteCook {
    userId: NanoId;
    cookId: NanoId;
    createdAt: Date;

    cook?: PublicCook;
}
