import { Platform } from '../shared.js';

export interface MenuVisit {
    menuVisitId: string;
    menuId: string;
    sessionId: string;
    userId?: string;
    platform: Platform;
    createdAt: Date;
}
