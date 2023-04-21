import { type Location, type NanoId } from '../shared';

export interface Address {
    addressId: NanoId;
    userId: NanoId;
    title: string;
    country: string;
    city: string;
    postCode: string;
    street: string;
    houseNumber: string;
    location: Location;
    createdAt: Date;
}
