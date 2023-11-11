import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
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

export function createAdminService(runtime: Runtime): AdminService {
    return {
        findOne: (context: Authorization.Context, request: { adminId: NanoId }) => findOne({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneAdminRequest) => createOne({ runtime, context, request }),
    };
}
