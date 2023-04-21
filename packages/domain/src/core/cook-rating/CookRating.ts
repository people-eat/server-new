import { type NanoId } from '../shared';

export interface CookRating {
    bookingRequestId: NanoId;
    userId: NanoId;
    cookId: NanoId;
    message: string;
    rating: number;
    createdAt: Date;
}
