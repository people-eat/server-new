import { Database, Logger } from '../index.js';
import { Context } from './Context.js';

interface CanMutateUserDataInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Context;
    userId: string;
}

export default async function canMutateUserData({ databaseAdapter, logger, context, userId }: CanMutateUserDataInput): Promise<void> {
    if (!context.userId) throw new Error('Unauthorized');

    if (context.userId === userId) return;

    // query database for admin

    throw new Error('Unauthorized');
}
