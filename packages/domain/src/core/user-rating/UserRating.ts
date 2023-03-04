export interface UserRating {
    bookingRequestId: string;
    userId: string;
    cookId: string;
    message: string;
    rating: number;
    createdAt: Date;
}
