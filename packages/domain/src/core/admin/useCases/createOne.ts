import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type CreateOneAdminRequest } from '../CreateOneAdminRequest';

export interface CreateOneAdminInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneAdminRequest;
}

export async function createOne({ runtime: { dataSourceAdapter, logger }, context, request }: CreateOneAdminInput): Promise<boolean> {
    const { adminId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const success: boolean = await dataSourceAdapter.adminRepository.insertOne({
        adminId,
        createdAt: new Date(),
    });

    return success;
}
