import { type NanoId } from '../shared';

export interface CreateOneBookingRequestAllergy {
    bookingRequestId: NanoId;
    allergyId: NanoId;
}
