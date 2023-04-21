import { type NanoId, type Platform } from '../shared';

export interface MenuVisit {
    menuVisitId: NanoId;
    menuId: NanoId;
    sessionId: NanoId;
    userId?: NanoId;
    platform: Platform;
    createdAt: Date;
}
