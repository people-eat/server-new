import { type NanoId } from '../shared';

export interface ChatMessage {
    chatMessageId: NanoId;
    bookingRequestId: NanoId;
    message: string;
    createdBy: NanoId;
    createdAt: Date;
}
