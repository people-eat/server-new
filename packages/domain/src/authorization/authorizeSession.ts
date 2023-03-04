import { Session } from '../core/session/index.js';
import { Database, Logger } from '../index.js';
import createOneSession from './createOneSession.js';
import extendOneSession from './extendOneSession.js';

export interface AuthorizeSessionInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    sessionId?: string;
}

export interface AuthorizeSessionOutput {
    expirationDate: Date;
    sessionId: string;
    userId?: string;
}

// one month
const sessionLifeTime: number = 30 * 24 * 60 * 60 * 1000;

// eslint-disable-next-line max-statements
export async function authorizeSession({
    databaseAdapter,
    logger,
    sessionId,
}: AuthorizeSessionInput): Promise<AuthorizeSessionOutput | undefined> {
    if (!sessionId) {
        const createdSessionId: string | undefined = await createOneSession({ databaseAdapter, logger });
        if (!createdSessionId) {
            logger.error('Failed creating a session for a request without session id');
            return;
        }

        logger.debug(`Created a session with session id ${createdSessionId} for request without session id`);

        return {
            expirationDate: new Date(Date.now() + sessionLifeTime),
            sessionId: createdSessionId,
            userId: undefined,
        };
    }

    const session: Session | undefined = await databaseAdapter.sessionRepository.findOne({ sessionId });

    if (!session) {
        logger.debug(`Received request with session id ${sessionId} without according session`);

        const createdSessionId: string | undefined = await createOneSession({ databaseAdapter, logger });
        if (!createdSessionId) {
            logger.error('Failed creating a session for a request with invalid session id');
            return;
        }

        logger.debug(`Created a session with session id ${createdSessionId} for request with invalid session id`);

        return {
            expirationDate: new Date(Date.now() + sessionLifeTime),
            sessionId: createdSessionId,
            userId: undefined,
        };
    }

    if (!session.expired && new Date(session.lastExtendedAt.getTime() + sessionLifeTime) > new Date()) {
        logger.debug(`Received request with session id ${sessionId} with according session that is not expired`);

        const success: boolean = await extendOneSession({ databaseAdapter, logger, sessionId });
        if (!success) {
            logger.error(`Extension of session with session id ${sessionId} failed`);
            return;
        }

        logger.debug(`Extended session with session id ${sessionId}`);

        return {
            expirationDate: new Date(Date.now() + sessionLifeTime),
            sessionId: session.sessionId,
            userId: session.userId,
        };
    }

    logger.debug(`Received request with session id ${sessionId} with according session that is expired`);

    const createdSessionId: string | undefined = await createOneSession({ databaseAdapter, logger });
    if (!createdSessionId) return;

    return {
        expirationDate: new Date(Date.now() + sessionLifeTime),
        sessionId: createdSessionId,
        userId: undefined,
    };
}
