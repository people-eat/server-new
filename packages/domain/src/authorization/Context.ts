import { type NanoId } from '../core/shared';

export interface Context {
    sessionId?: NanoId;
    userId?: NanoId;
    requestingClientType: 'WEB_SSR' | 'WEB_BROWSER' | 'UNKNOWN';
}
