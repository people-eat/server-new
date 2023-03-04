import { NanoId } from '../shared.js';

export interface UserRating {
    bookingRequestId: NanoId;
    userId: NanoId;
    cookId: NanoId;
    message: string;
    rating: number;
    createdAt: Date;
}
