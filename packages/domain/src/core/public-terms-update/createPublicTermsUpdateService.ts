import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type PublicTermsUpdate } from './PublicTermsUpdate';
import { findLatest } from './useCases/findLatest';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface PublicTermsUpdateService {
    findOne(context: Authorization.Context, request: { termsUpdateId: NanoId }): Promise<PublicTermsUpdate | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<PublicTermsUpdate[] | undefined>;
    findLatest(context: Authorization.Context): Promise<PublicTermsUpdate | undefined>;
}

export function createPublicTermsUpdateService({ dataSourceAdapter, logger }: Runtime): PublicTermsUpdateService {
    return {
        findOne: (context: Authorization.Context, request: { termsUpdateId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        findLatest: (context: Authorization.Context) => findLatest({ dataSourceAdapter, logger, context }),
    };
}
