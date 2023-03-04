import { Database, Logger } from '../../index.js';

export interface PrivacyPolicyUpdateService {}

export interface CreatePrivacyPolicyUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createPrivacyPolicyUpdateService({
    databaseAdapter,
    logger,
}: CreatePrivacyPolicyUpdateServiceInput): PrivacyPolicyUpdateService {
    return {};
}
