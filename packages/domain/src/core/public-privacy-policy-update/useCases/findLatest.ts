import { type Authorization, type DataSource, type Logger } from '../../..';
import { type PublicPrivacyPolicyUpdate } from '../PublicPrivacyPolicyUpdate';

export interface FindOneCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
}

export async function findLatest({ dataSourceAdapter }: FindOneCategoryInput): Promise<PublicPrivacyPolicyUpdate | undefined> {
    const privacyPolicyUpdates: DataSource.DBPrivacyPolicyUpdate[] | undefined =
        await dataSourceAdapter.privacyPolicyUpdateRepository.findMany({});

    if (!privacyPolicyUpdates?.length) return;

    return privacyPolicyUpdates[0];
}
