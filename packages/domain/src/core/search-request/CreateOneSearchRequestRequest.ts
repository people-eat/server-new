import { type SearchRequestOrigin } from './SearchRequest';

export interface CreateOneSearchRequestRequest {
    adults: number;
    children: number;
    locationText: string;
    date: string;
    origin: SearchRequestOrigin;
}
