import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindOneGlobalBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; globalBookingRequestId: NanoId };
}

export async function findOne({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindOneGlobalBookingRequestInput): Promise<GlobalBookingRequest | undefined> {
    const { globalBookingRequestId, userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const globalBookingRequest: DataSource.DBGlobalBookingRequest | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findOne({ globalBookingRequestId, userId });

    if (!globalBookingRequest) return;

    return packPrice(packLocation(globalBookingRequest));
}
