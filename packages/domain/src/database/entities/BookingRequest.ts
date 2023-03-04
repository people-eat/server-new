import { BookingRequest } from '../../core/booking-request/BookingRequest.js';
import { CurrencyCode } from '../../core/shared.js';

export interface DBBookingRequest extends Omit<BookingRequest, 'location' | 'price'> {
    latitude: number;
    longitude: number;

    amount: number;
    currencyCode: CurrencyCode;
}
