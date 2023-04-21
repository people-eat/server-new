import { type PublicUser } from '../public-user';
import { type CookRank, type Location, type NanoId } from '../shared';

export interface PublicCook {
    cookId: NanoId;
    user?: PublicUser;
    location: Location;
    city: string;
    rank: CookRank;
    biography: string;
    travelExpenses: number;
    maximumTravelDistance?: number;
    minimumPrice?: number;
    maximumPrice?: number;
    minimumParticipants?: number;
    maximumParticipants?: number;
    createdAt: Date;
}
