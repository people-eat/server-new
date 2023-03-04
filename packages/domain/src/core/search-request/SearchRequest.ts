import { Location } from '../shared.js';

export interface SearchRequest {
    searchRequestId: string;
    adults: number;
    children: number;
    location: Location;
}
