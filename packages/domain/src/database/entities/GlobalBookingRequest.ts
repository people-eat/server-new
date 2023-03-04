import type { GlobalBookingRequest } from '../../core/global-booking-request';

export interface DBGlobalBookingRequest extends Omit<GlobalBookingRequest, 'location'> {
    latitude: number;
    longitude: number;
}
