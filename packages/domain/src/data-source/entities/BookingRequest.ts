import { type BookingRequest } from '../../core/booking-request/BookingRequest';
import { type CurrencyCode } from '../../core/shared';

export interface DBBookingRequest extends Omit<BookingRequest, 'location' | 'priceCook' | 'priceUser' | 'price' | 'status'> {
    latitude: number;
    longitude: number;
    locationText: string;

    totalAmountUser: number;
    totalAmountCook: number;
    currencyCode: CurrencyCode;
}
