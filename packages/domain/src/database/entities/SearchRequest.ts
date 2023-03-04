import type { SearchRequest } from '../../core/search-request/SearchRequest.js';

export interface DBSearchRequest extends Omit<SearchRequest, 'location'> {
    latitude: number;
    longitude: number;
}
