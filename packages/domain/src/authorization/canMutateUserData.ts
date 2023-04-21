import { type DataSource, type Logger } from '..';
import { type Context } from './Context';

interface CanMutateUserDataInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Context;
    userId: string;
}

export async function canMutateUserData({ context, userId }: CanMutateUserDataInput): Promise<void> {
    if (!context.userId) throw new Error('Unauthorized');

    if (context.userId === userId) return;

    // query database for admin

    throw new Error('Unauthorized');
}
