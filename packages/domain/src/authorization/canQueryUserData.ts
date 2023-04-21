import { type DataSource, type Logger } from '..';
import { type Context } from './Context';

interface CanQueryUserDataInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Context;
    userId: string;
}

export async function canQueryUserData({ context, userId }: CanQueryUserDataInput): Promise<void> {
    if (!context.userId) throw new Error('Unauthorized');

    if (context.userId === userId) return;

    // query database for admin

    throw new Error('Unauthorized');
}
