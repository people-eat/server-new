import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneSupportRequestRequest } from './CreateOneSupportRequestRequest';
import { type SupportRequest } from './SupportRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface SupportRequestService {
    findOne(context: Authorization.Context, request: { supportRequestId: NanoId }): Promise<SupportRequest | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<SupportRequest[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneSupportRequestRequest & { userId: NanoId }): Promise<boolean>;
}

export function createSupportRequestService(runtime: Runtime): SupportRequestService {
    const { dataSourceAdapter, logger } = runtime;

    return {
        findOne: (context: Authorization.Context, request: { supportRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneSupportRequestRequest & { userId: NanoId }) =>
            createOne({ runtime, context, request }),
    };
}
