import { Location } from '../shared.js';

export interface CreateOneAddressRequest {
    title: string;
    country: string;
    city: string;
    postCode: string;
    street: string;
    houseNumber: string;
    location: Location;
}
