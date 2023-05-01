import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type User } from '../User';

export interface FindManyUsersInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter, logger, context }: FindManyUsersInput): Promise<User[] | undefined> {
    await Authorization.isAdmin({ dataSourceAdapter, logger, context });

    const users: DataSource.DBUser[] | undefined = await dataSourceAdapter.userRepository.findMany({});

    if (!users) return;

    return users;
}
