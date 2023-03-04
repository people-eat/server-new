import { PublicUser } from '../public-user/index.js';
import { CookRank, Location } from '../shared.js';

export interface PublicCook {
    cookId: string;
    user: PublicUser;
    location: Location;
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
