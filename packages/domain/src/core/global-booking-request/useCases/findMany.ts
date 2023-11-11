import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type FindManyRequest } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindManyGlobalBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({
    dataSourceAdapter,
    context,
    logger,
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const globalBookingRequests: DataSource.DBGlobalBookingRequest[] | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findMany({});

    if (!globalBookingRequests) return;

    return globalBookingRequests.map(packLocation).map(packPrice);
}
