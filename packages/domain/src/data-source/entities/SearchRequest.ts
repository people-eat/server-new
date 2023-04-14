import { type SearchRequest } from '../../core/search-request/SearchRequest';

export interface DBSearchRequest extends Omit<SearchRequest, 'location'> {
    latitude: number;
    longitude: number;
}
