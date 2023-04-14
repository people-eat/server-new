import { type GlobalBookingRequest } from '../../core/global-booking-request';
import { type CurrencyCode } from '../../core/shared';

export interface DBGlobalBookingRequest extends Omit<GlobalBookingRequest, 'location' | 'price'> {
    latitude: number;
    longitude: number;
    amount: number;
    currencyCode: CurrencyCode;
}
