import { type NanoId } from '../shared';

export interface Notification {
    notificationId: NanoId;
    userId: NanoId;
    message: string;
    url?: string;
    wasRead: boolean;
    createdAt: Date;
}
