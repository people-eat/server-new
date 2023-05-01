import { type Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type PublicPrivacyPolicyUpdate } from '../PublicPrivacyPolicyUpdate';

export interface FindOneCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { privacyPolicyUpdateId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOneCategoryInput): Promise<PublicPrivacyPolicyUpdate | undefined> {
    const { privacyPolicyUpdateId } = request;

    const privacyPolicyUpdate: DataSource.DBPrivacyPolicyUpdate | undefined = await dataSourceAdapter.privacyPolicyUpdateRepository.findOne(
        {
            privacyPolicyUpdateId,
        },
    );

    if (!privacyPolicyUpdate) return;

    return privacyPolicyUpdate;
}
