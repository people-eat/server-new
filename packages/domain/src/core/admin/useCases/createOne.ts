import { Authorization, type DataSource, type Logger } from '../../..';
import { type CreateOneAdminRequest } from '../CreateOneAdminRequest';

export interface CreateOneAdminInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneAdminRequest;
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneAdminInput): Promise<boolean> {
    const { adminId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const success: boolean = await dataSourceAdapter.adminRepository.insertOne({
        adminId,
        createdAt: new Date(),
    });

    return success;
}
