import { Database, Logger } from '../index.js';
import { Context } from './Context.js';

interface CanQueryUserDataInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Context;
}

export default async function isAdmin({ databaseAdapter, context }: CanQueryUserDataInput): Promise<void> {
    if (!context.userId) throw new Error('Unauthorized');

    const admin: Database.DBAdmin | undefined = await databaseAdapter.adminRepository.findOne({ adminId: context.userId });

    if (!admin) throw new Error('Unauthorized');
}
