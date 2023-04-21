import { type NanoId } from '../shared';

export interface BookingRequestAllergy {
    bookingRequestId: NanoId;
    allergyId: NanoId;
}
