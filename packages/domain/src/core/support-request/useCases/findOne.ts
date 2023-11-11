import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type SupportRequest } from '../SupportRequest';

export interface FindOneSupportRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { supportRequestId: NanoId };
}

export async function findOne({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindOneSupportRequestInput): Promise<SupportRequest | undefined> {
    const { supportRequestId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const supportRequest: DataSource.DBSupportRequest | undefined = await dataSourceAdapter.supportRequestRepository.findOne({
        supportRequestId,
    });

    if (!supportRequest) return;

    return supportRequest;
}
