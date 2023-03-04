import { Authorization, Database, Logger } from '../../index.js';
import toUser from './toUser.js';
import { User } from './User.js';

export interface FindOneUserByUserIdInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: Pick<Database.DBUser, 'userId'>;
}

export async function findOneUserByUserId({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindOneUserByUserIdInput): Promise<User | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ userId });

    if (!user) return undefined;

    return toUser(user);
}
