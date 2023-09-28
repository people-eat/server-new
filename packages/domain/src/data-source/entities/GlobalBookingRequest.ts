import { type GlobalBookingRequest } from '../../core/global-booking-request';
import { type CurrencyCode } from '../../core/shared';

export interface DBGlobalBookingRequest extends Omit<GlobalBookingRequest, 'location' | 'price'> {
    latitude: number;
    longitude: number;
    locationText: string;

    amount: number;
    currencyCode: CurrencyCode;
}
