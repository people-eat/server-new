import { type Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type Session } from '../Session';

export interface FindCurrentSessionInput {
    runtime: Runtime;
    context: Authorization.Context;
}

export async function findCurrent({ runtime: { dataSourceAdapter, logger }, context }: FindCurrentSessionInput): Promise<Session> {
    if (!context.sessionId) {
        return {
            sessionId: '',
            title: undefined,
            platform: 'NO_INFORMATION',
            expired: true,
            lastExtendedAt: new Date(),
            createdAt: new Date(),
            isAssignedToUser: false,
        };
    }

    const session: DataSource.DBSession | undefined = await dataSourceAdapter.sessionRepository.findOne({ sessionId: context.sessionId });

    if (!session) {
        const errorMessage: string = `Received get current session request without session id: ${context.sessionId}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    return {
        ...session,
        isAssignedToUser: Boolean(session.userId),
    };
}
