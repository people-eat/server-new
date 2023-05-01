import { type Location, type NanoId, type Price } from '../shared';

export interface GlobalBookingRequest {
    globalBookingRequestId: NanoId;
    userId: NanoId;
    adultParticipants: number;
    children: number;
    price: Price;
    dateTime: Date;
    duration: number;
    occasion: string;
    message: string;
    kitchenId?: string;
    location: Location;
    expiresAt: Date;
    createdAt: Date;
}
