import { Authorization, type DataSource, type Logger } from '../../..';
import { type User } from '../User';

export interface FindOneUserByUserIdInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOneUserByUserIdRequest;
}

export interface FindOneUserByUserIdRequest {
    userId: string;
}

export async function findOneByUserId({
    dataSourceAdapter,
    logger,
    context,
    request: { userId },
}: FindOneUserByUserIdInput): Promise<User | undefined> {
    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const user: DataSource.DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return undefined;

    return user;
}
