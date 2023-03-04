import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import toUser from '../toUser.js';
import { User } from '../User.js';

export interface FindManyUsersInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter, logger, context }: FindManyUsersInput): Promise<User[] | undefined> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const users: Database.DBUser[] | undefined = await databaseAdapter.userRepository.findMany({});

    if (!users) return;

    return users.map(toUser);
}
