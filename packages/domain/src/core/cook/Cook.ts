import { type CookRank, type Location, type NanoId } from '../shared';
import { type CookPayoutMethod } from './CookPayoutMethod';

export interface Cook {
    cookId: NanoId;
    isLocked: boolean;
    isVisible: boolean;
    name?: string;
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
    payoutMethods: CookPayoutMethod[];
    createdAt: Date;

    hasStripePayoutMethodActivated: boolean;
}
