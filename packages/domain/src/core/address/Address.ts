import { Location } from '../shared.js';

export interface Address {
    addressId: string;
    userId: string;
    title: string;
    country: string;
    city: string;
    postCode: string;
    street: string;
    houseNumber: string;
    location: Location;
    createdAt: Date;
}
