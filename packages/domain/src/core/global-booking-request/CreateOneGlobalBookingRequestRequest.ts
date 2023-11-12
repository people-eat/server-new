import { type Location, type NanoId } from '../shared';
import { type GlobalBookingRequestPriceClassType } from './GlobalBookingRequest';

export interface CreateOneGlobalBookingRequestRequest {
    adultParticipants: number;
    children: number;
    priceClassType: GlobalBookingRequestPriceClassType;
    dateTime: Date;
    duration: number;
    occasion: string;
    message: string;
    location: Location;

    kitchenId?: string;
    allergyIds?: NanoId[];
    categoryIds?: NanoId[];

    // Todo: remove
    phoneNumber?: string;
}
