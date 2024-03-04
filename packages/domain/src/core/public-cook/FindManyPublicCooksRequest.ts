import { type FindManyRequest, type Location } from '../shared';

export interface FindManyPublicCooksRequest extends FindManyRequest {
    location: Location;
}
