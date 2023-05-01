import { Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Admin } from '../Admin';

export interface FindManyAdminsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter, logger, context }: FindManyAdminsInput): Promise<Admin[] | undefined> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const admins: DataSource.DBAdmin[] | undefined = await dataSourceAdapter.adminRepository.findMany({});

    if (!admins) return;

    return admins;
}
