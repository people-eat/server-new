import { type Authorization, type SearchRequest } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneSearchRequestRequest } from './CreateOneSearchRequestRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';

export interface SearchRequestService {
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<SearchRequest[]>;
    createOne(context: Authorization.Context, request: CreateOneSearchRequestRequest): Promise<boolean>;
}

export function createSearchRequestService({ dataSourceAdapter, logger }: Runtime): SearchRequestService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneSearchRequestRequest) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
