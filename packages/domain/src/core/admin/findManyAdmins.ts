import { Authorization, Database, Logger } from '../../index.js';
import { Admin } from './Admin.js';

export interface FindManyAdminsInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { searchText?: string };
}

export async function findManyAdmins({
    databaseAdapter,
    logger,
    context,
    request: { searchText },
}: FindManyAdminsInput): Promise<Admin[] | undefined> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const admins: Database.DBAdmin[] | undefined = await databaseAdapter.adminRepository.findMany({});

    if (!admins) return;

    return admins;
}
