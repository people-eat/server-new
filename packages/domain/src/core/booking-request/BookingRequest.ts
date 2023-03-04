import { Location, Price } from '../shared.js';

export interface BookingRequest {
    bookingRequestId: string;
    userId: string;
    cookId: string;
    location: Location;
    dateTime: Date;
    preparationTime: number;
    duration: number;
    adultParticipants: number;
    children: number;
    price: Price;
    customerFee: number;
    cookFee: number;
    occasion: string;
    message: string;
    createdAt: Date;
}
