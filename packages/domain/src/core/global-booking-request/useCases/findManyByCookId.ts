import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindManyGlobalBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { cookId: NanoId };
}

export async function findManyByCookId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    const { cookId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const globalBookingRequests: DataSource.DBGlobalBookingRequest[] | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findMany({});

    // filter relevant ones for cook

    if (!globalBookingRequests) return;

    return globalBookingRequests.map(packLocation).map(packPrice);
}
