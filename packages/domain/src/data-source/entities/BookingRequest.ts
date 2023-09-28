import { type BookingRequest } from '../../core/booking-request/BookingRequest';
import { type CurrencyCode } from '../../core/shared';

export interface DBBookingRequest extends Omit<BookingRequest, 'location' | 'price' | 'status'> {
    latitude: number;
    longitude: number;
    locationText: string;

    amount: number;
    currencyCode: CurrencyCode;
}
