import { type NanoId } from '../shared';

export interface SupportRequest {
    supportRequestId: NanoId;
    userId: NanoId;
    bookingRequestId?: string;
    subject: string;
    message: string;
    createdAt: Date;
}
