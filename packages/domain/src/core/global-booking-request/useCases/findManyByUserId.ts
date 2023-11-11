import { Authorization, type DataSource } from '../../..';
import packLocation from '../../packLocation';
import packPrice from '../../packPrice';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

export interface FindManyGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findManyByUserId({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    const { userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const globalBookingRequests: DataSource.DBGlobalBookingRequest[] | undefined =
        await dataSourceAdapter.globalBookingRequestRepository.findMany({ userId });

    if (!globalBookingRequests) return;

    return globalBookingRequests.map(packLocation).map(packPrice);
}
