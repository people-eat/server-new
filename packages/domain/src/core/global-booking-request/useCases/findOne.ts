import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindOneGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { globalBookingRequestId: NanoId };
}

export async function findOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: FindOneGlobalBookingRequestInput): Promise<GlobalBookingRequest | undefined> {
    const { globalBookingRequestId } = request;

    const globalBookingRequest: DataSource.DBGlobalBookingRequest | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findOne({ globalBookingRequestId });

    if (!globalBookingRequest) return;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId: globalBookingRequest.userId });

    return packLocation(globalBookingRequest);
}
