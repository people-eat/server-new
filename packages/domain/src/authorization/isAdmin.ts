import { type DataSource, type Logger } from '..';
import { type Context } from './Context';

interface CanQueryUserDataInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Context;
}

export async function isAdmin({ dataSourceAdapter, context }: CanQueryUserDataInput): Promise<void> {
    if (!context.userId) throw new Error('Unauthorized');

    const admin: DataSource.DBAdmin | undefined = await dataSourceAdapter.adminRepository.findOne({ adminId: context.userId });

    if (!admin) throw new Error('Unauthorized');
}
