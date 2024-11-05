import { type Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type PublicPrivacyPolicyUpdate } from '../PublicPrivacyPolicyUpdate';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<PublicPrivacyPolicyUpdate[] | undefined> {
    const privacyPolicyUpdates: DataSource.DBPrivacyPolicyUpdate[] | undefined =
        await dataSourceAdapter.privacyPolicyUpdateRepository.findAll();

    if (!privacyPolicyUpdates) return;

    return privacyPolicyUpdates;
}
