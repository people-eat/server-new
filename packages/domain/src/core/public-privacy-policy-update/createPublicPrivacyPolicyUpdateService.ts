import { type Authorization, type DataSource, type Logger } from '../..';
import { type FindManyRequest, type NanoId } from '../shared';
import { type PublicPrivacyPolicyUpdate } from './PublicPrivacyPolicyUpdate';
import { findLatest } from './useCases/findLatest';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface PublicPrivacyPolicyUpdateService {
    findOne(context: Authorization.Context, request: { privacyPolicyUpdateId: NanoId }): Promise<PublicPrivacyPolicyUpdate | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<PublicPrivacyPolicyUpdate[] | undefined>;
    findLatest(context: Authorization.Context): Promise<PublicPrivacyPolicyUpdate | undefined>;
}

export interface CreatePublicPrivacyPolicyUpdateServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createPublicPrivacyPolicyUpdateService({
    dataSourceAdapter,
    logger,
}: CreatePublicPrivacyPolicyUpdateServiceInput): PublicPrivacyPolicyUpdateService {
    return {
        findOne: (context: Authorization.Context, request: { privacyPolicyUpdateId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        findLatest: (context: Authorization.Context) => findLatest({ dataSourceAdapter, logger, context }),
    };
}
