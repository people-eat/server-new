import { type BookingRequest } from '../../core/booking-request/BookingRequest';
import { type CurrencyCode } from '../../core/shared';

export interface DBBookingRequest extends Omit<BookingRequest, 'location' | 'price'> {
    latitude: number;
    longitude: number;

    amount: number;
    currencyCode: CurrencyCode;
}
