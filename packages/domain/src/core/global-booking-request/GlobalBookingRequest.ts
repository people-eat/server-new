import { type Location, type NanoId } from '../shared';

export type GlobalBookingRequestPriceClassType = 'SIMPLE' | 'FINE' | 'GOURMET';

export interface GlobalBookingRequestPriceClass {
    type: GlobalBookingRequestPriceClassType;
    min: number;
    max: number;
    currencyCode: string;
}

export interface GlobalBookingRequestConditions {
    location: Location;
    dateTime: Date;
    duration: number;
    adultParticipants: number;
    children: number;
    occasion: string;
    priceClassType: GlobalBookingRequestPriceClassType;
}

export interface GlobalBookingRequest {
    globalBookingRequestId: NanoId;
    userId: NanoId;
    message: string;
    conditions: GlobalBookingRequestConditions;
    expiresAt: Date;
    createdAt: Date;
}
