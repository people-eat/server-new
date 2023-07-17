import { type NanoId } from '../shared';

export interface ChatMessage {
    chatMessageId: NanoId;
    bookingRequestId: NanoId;
    message: string;
    generated: boolean;
    createdBy: NanoId;
    createdAt: Date;
}
