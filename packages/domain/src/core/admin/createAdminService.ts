import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Admin } from './Admin.js';
import { createOne, CreateOneAdminRequest } from './useCases/createOne.js';
import { findMany } from './useCases/findMany.js';
export interface AdminService {
    createOne(context: Authorization.Context, request: CreateOneAdminRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Admin[] | undefined>;
}

export interface CreateAdminServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createAdminService({ databaseAdapter, logger }: CreateAdminServiceInput): AdminService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneAdminRequest) =>
            createOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
    };
}
