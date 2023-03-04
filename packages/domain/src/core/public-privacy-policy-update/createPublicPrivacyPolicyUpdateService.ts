import { Database, Logger } from '../../index.js';

export interface PublicPrivacyPolicyUpdateService {}

export interface CreatePublicPrivacyPolicyUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createPublicPrivacyPolicyUpdateService({
    databaseAdapter,
    logger,
}: CreatePublicPrivacyPolicyUpdateServiceInput): PublicPrivacyPolicyUpdateService {
    return {};
}
