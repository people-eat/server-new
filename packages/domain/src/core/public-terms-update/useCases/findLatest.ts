import { type Authorization, type DataSource, type Logger } from '../../..';
import { type PublicTermsUpdate } from '../PublicTermsUpdate';

export interface FindOneCategoryInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
}

export async function findLatest({ dataSourceAdapter }: FindOneCategoryInput): Promise<PublicTermsUpdate | undefined> {
    const termsUpdates: DataSource.DBTermsUpdate[] | undefined = await dataSourceAdapter.termsUpdateRepository.findAll();

    if (!termsUpdates?.length) return;

    return termsUpdates[0];
}
