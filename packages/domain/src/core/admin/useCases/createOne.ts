import { Context, isAdmin } from '../../../authorization/index.js';
import { Database, Logger } from '../../../index.js';

interface CreateOneAdminInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Context;
    request: CreateOneAdminRequest;
}

export interface CreateOneAdminRequest {
    userId: string;
}

export async function createOne({ databaseAdapter, logger, context, request: { userId } }: CreateOneAdminInput): Promise<boolean> {
    await isAdmin({ databaseAdapter, logger, context });

    const success: boolean = await databaseAdapter.adminRepository.insertOne({
        adminId: userId,
        createdAt: new Date(),
    });

    return success;
}
