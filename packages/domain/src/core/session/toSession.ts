import { DBSession } from '../../database/index.js';
import { Session } from './Session.js';

export default function toSession(dbSession: DBSession): Session {
    return {
        sessionId: dbSession.sessionId,
        userId: dbSession.userId,
        title: dbSession.title,
        platform: dbSession.platform,
        expired: dbSession.expired,
        lastExtendedAt: dbSession.lastExtendedAt,
        createdAt: dbSession.createdAt,
    };
}
