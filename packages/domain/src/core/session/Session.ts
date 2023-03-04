import { Platform } from '../shared';

export interface Session {
    sessionId: string;
    userId: string | undefined;
    title: string | undefined;
    platform: Platform;
    expired: boolean;
    lastExtendedAt: Date;
    createdAt: Date;
}
