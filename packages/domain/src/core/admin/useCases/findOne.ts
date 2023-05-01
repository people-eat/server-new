import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Admin } from '../Admin';

export interface FindOneAdminInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { adminId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneAdminInput): Promise<Admin | undefined> {
    const { adminId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: adminId });

    const admin: DataSource.DBAdmin | undefined = await dataSourceAdapter.adminRepository.findOne({ adminId });

    if (!admin) return;

    return admin;
}
