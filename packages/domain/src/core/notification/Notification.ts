export interface Notification {
    notificationId: string;
    userId: string;
    message: string;
    url?: string;
    wasRead: boolean;
    createdAt: Date;
}
