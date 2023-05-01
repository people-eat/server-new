import { type Location, type NanoId, type Price } from '../shared';

export interface CreateOneGlobalBookingRequestRequest {
    adultParticipants: number;
    children: number;
    price: Price;
    dateTime: Date;
    duration: number;
    occasion: string;
    message: string;
    location: Location;

    kitchenId?: string;
    allergyIds?: NanoId[];
    categoryIds?: NanoId[];
}
