import { type GlobalBookingRequest, type GlobalBookingRequestPriceClassType } from '../../core/global-booking-request';

export interface DBGlobalBookingRequest extends Omit<GlobalBookingRequest, 'location' | 'conditions'> {
    latitude: number;
    longitude: number;
    locationText: string;

    dateTime: Date;
    duration: number;
    adultParticipants: number;
    children: number;
    occasion: string;
    priceClassType: GlobalBookingRequestPriceClassType;
}
