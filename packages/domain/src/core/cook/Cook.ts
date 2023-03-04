import { CookRank, Location } from '../shared.js';

export interface Cook {
    cookId: string;
    isLocked: boolean;
    isVisible: boolean;
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
