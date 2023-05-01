import { type CookRank, type Location, type NanoId } from '../shared';

export interface CreateOneCookRequest {
    isVisible: boolean;
    name?: string;
    location: Location;
    rank: CookRank;
    biography: string;
    travelExpenses: number;
    maximumTravelDistance?: number;
    minimumPrice?: number;
    maximumPrice?: number;
    minimumParticipants?: number;
    maximumParticipants?: number;

    languageIds?: NanoId[];
}
