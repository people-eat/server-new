import { type NanoId, type Platform } from '../shared';

export interface CookVisit {
    cookVisitId: NanoId;
    cookId: NanoId;
    sessionId: NanoId;
    userId?: NanoId;
    platform: Platform;
    createdAt: Date;
}
