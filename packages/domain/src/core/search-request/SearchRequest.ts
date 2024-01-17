import { type NanoId } from '../shared';

export type SearchRequestOrigin = 'HOME' | 'PUBLIC_MENUS' | 'PUBLIC_COOKS';

export interface SearchRequest {
    searchRequestId: NanoId;
    adults: number;
    children: number;
    locationText: string;
    date: string;
    origin: SearchRequestOrigin;
    createdAt: Date;
}
