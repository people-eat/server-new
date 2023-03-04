export interface ChatMessage {
    chatMessageId: string;
    bookingRequestId: string;
    message: string;
    createdBy: string;
    createdAt: Date;
}
