import { type Location, type NanoId } from '../shared';

export interface SearchRequest {
    searchRequestId: NanoId;
    adults: number;
    children: number;
    location: Location;
}
