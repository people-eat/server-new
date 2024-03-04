import { type FindManyRequest, type Location } from '../shared';

export interface FindManyPublicMenusRequest extends FindManyRequest {
    location: Location;
}
