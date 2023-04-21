import { type Location, type NanoId } from '../shared';

export interface GlobalBookingRequest {
    globalBookingRequestId: NanoId;
    userId: NanoId;
    title: string;
    description: string;
    location: Location;
    expiresAt: Date;
    createdAt: Date;
}
