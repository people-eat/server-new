import { Platform } from '../shared.js';

export interface Session {
    sessionId: string;
    userId: string | undefined;
    title: string | undefined;
    platform: Platform;
    expired: boolean;
    lastExtendedAt: Date;
    createdAt: Date;
}
