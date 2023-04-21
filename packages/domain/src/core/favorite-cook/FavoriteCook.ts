import { type NanoId } from '../shared';

export interface FavoriteCook {
    userId: NanoId;
    cookId: NanoId;
    createdAt: Date;
}
