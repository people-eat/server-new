import { type Authorization, type DataSource, type Logger } from '../..';
import { type FindManyRequest, type NanoId } from '../shared';
import { type Admin } from './Admin';
import { type CreateOneAdminRequest } from './CreateOneAdminRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface AdminService {
    findOne(context: Authorization.Context, request: { adminId: NanoId }): Promise<Admin | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Admin[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneAdminRequest): Promise<boolean>;
}

export interface CreateAdminServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createAdminService({ dataSourceAdapter, logger }: CreateAdminServiceInput): AdminService {
    return {
        findOne: (context: Authorization.Context, request: { adminId: NanoId }) => findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneAdminRequest) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
