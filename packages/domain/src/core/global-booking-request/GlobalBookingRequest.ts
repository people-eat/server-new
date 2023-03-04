import { Location } from '../shared.js';

export interface GlobalBookingRequest {
    globalBookingRequestId: string;
    userId: string;
    title: string;
    description: string;
    location: Location;
    expiresAt: Date;
    createdAt: Date;
}
