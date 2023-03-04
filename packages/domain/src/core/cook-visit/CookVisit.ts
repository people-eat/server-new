import { Platform } from '../shared.js';

export interface CookVisit {
    cookVisitId: string;
    cookId: string;
    sessionId: string;
    userId?: string;
    platform: Platform;
    createdAt: Date;
}
