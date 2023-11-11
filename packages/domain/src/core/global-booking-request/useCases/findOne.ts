import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindOneGlobalBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { globalBookingRequestId: NanoId };
}

export async function findOne({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindOneGlobalBookingRequestInput): Promise<GlobalBookingRequest | undefined> {
    const { globalBookingRequestId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const globalBookingRequest: DataSource.DBGlobalBookingRequest | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findOne({ globalBookingRequestId });

    if (!globalBookingRequest) return;

    return packPrice(packLocation(globalBookingRequest));
}
