import { type Location, type NanoId, type Price } from '../shared';

export interface BookingRequest {
    bookingRequestId: NanoId;
    userId: NanoId;
    cookId: NanoId;
    userAccepted?: boolean;
    cookAccepted?: boolean;
    location: Location;
    dateTime: Date;
    preparationTime: number;
    duration: number;
    adultParticipants: number;
    children: number;
    price: Price;
    fee: number;
    occasion: string;
    kitchenId?: NanoId;
    globalBookingRequestId?: NanoId;
    createdAt: Date;
}
