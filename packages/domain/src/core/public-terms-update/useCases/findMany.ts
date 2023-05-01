import { type Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type PublicTermsUpdate } from '../PublicTermsUpdate';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<PublicTermsUpdate[] | undefined> {
    const termsUpdates: DataSource.DBTermsUpdate[] | undefined = await dataSourceAdapter.termsUpdateRepository.findMany({});

    if (!termsUpdates) return;

    return termsUpdates;
}
