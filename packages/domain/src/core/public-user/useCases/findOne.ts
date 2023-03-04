import { Authorization, Database, Logger } from '../../../index.js';
import { PublicUser } from '../PublicUser.js';

interface FindOnePublicUserInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOnePublicUserRequest;
}

export interface FindOnePublicUserRequest {
    userId: string;
}

export async function findOne({ databaseAdapter, request }: FindOnePublicUserInput): Promise<PublicUser | undefined> {
    const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ userId: request.userId });

    if (!user) return;

    return user;
}
