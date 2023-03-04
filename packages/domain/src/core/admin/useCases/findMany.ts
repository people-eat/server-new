import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { Admin } from '../Admin.js';

interface FindManyAdminsInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter, logger, context }: FindManyAdminsInput): Promise<Admin[] | undefined> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const admins: Database.DBAdmin[] | undefined = await databaseAdapter.adminRepository.findMany({});

    if (!admins) return;

    return admins;
}
