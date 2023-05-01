import { type Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type PublicTermsUpdate } from '../PublicTermsUpdate';

export interface FindOneCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { termsUpdateId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOneCategoryInput): Promise<PublicTermsUpdate | undefined> {
    const { termsUpdateId } = request;

    const termsUpdate: DataSource.DBTermsUpdate | undefined = await dataSourceAdapter.termsUpdateRepository.findOne({ termsUpdateId });

    if (!termsUpdate) return;

    return termsUpdate;
}
