import bcrypt from 'bcryptjs';
import { Authorization, Database, Logger } from '../../index.js';
import { Platform } from '../shared.js';

export interface AssignOneSessionByEmailAddressInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { emailAddress: string; password: string; title: string; platform: Platform };
}

export async function assignOneSessionByEmailAddress({
    databaseAdapter,
    context,
    request,
}: AssignOneSessionByEmailAddressInput): Promise<boolean> {
    const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ emailAddress: request.emailAddress });

    // maybe lookup in email address updates

    if (!user) return false;

    if (!user.password) return false;

    if (!bcrypt.compareSync(request.password, user.password)) return false;

    if (user.isLocked) return false;

    if (user.failedSignInAttempts > 4) return false;

    const success: boolean = await databaseAdapter.sessionRepository.updateOne(
        { sessionId: context.sessionId },
        { userId: user.userId, title: request.title, platform: request.platform },
    );

    if (!success) return false;

    return true;
}
