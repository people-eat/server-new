import { type Location } from '../shared';

export interface CreateOneAddressRequest {
    title: string;
    country: string;
    city: string;
    postCode: string;
    street: string;
    houseNumber: string;
    location: Location;
}
