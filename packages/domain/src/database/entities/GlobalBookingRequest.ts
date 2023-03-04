import type { GlobalBookingRequest } from '../../core/global-booking-request/index.js';

export interface DBGlobalBookingRequest extends Omit<GlobalBookingRequest, 'location'> {
    latitude: number;
    longitude: number;
}
