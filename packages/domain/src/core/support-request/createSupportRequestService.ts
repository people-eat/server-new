import { type Authorization, type DataSource, type Logger } from '../..';
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

export interface CreateSupportRequestServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createSupportRequestService({ dataSourceAdapter, logger }: CreateSupportRequestServiceInput): SupportRequestService {
    return {
        findOne: (context: Authorization.Context, request: { supportRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneSupportRequestRequest & { userId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
