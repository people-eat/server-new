import { Authorization } from '../../..';
import { type DBGlobalBookingRequest } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';
import { toGlobalBookingRequestStatus } from '../toGlobalBookingRequestStatus';

export interface FindManyGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({
    runtime: { dataSourceAdapter, logger },
    context,
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const globalBookingRequests: DBGlobalBookingRequest[] | undefined = await dataSourceAdapter.globalBookingRequestRepository.findAll();

    if (!globalBookingRequests) return;

    globalBookingRequests.sort((a: DBGlobalBookingRequest, b: DBGlobalBookingRequest) => b.createdAt.getTime() - a.createdAt.getTime());

    return globalBookingRequests.map((globalBookingRequest: DBGlobalBookingRequest) => ({
        globalBookingRequestId: globalBookingRequest.globalBookingRequestId,
        userId: globalBookingRequest.userId,
        message: globalBookingRequest.message,
        conditions: {
            location: {
                text: globalBookingRequest.locationText,
                latitude: globalBookingRequest.latitude,
                longitude: globalBookingRequest.longitude,
            },
            dateTime: globalBookingRequest.dateTime,
            duration: globalBookingRequest.duration,
            adultParticipants: globalBookingRequest.adultParticipants,
            children: globalBookingRequest.children,
            occasion: globalBookingRequest.occasion,
            priceClassType: globalBookingRequest.priceClassType,
        },
        status: toGlobalBookingRequestStatus(dataSourceAdapter, globalBookingRequest),
        expiresAt: globalBookingRequest.expiresAt,
        createdAt: globalBookingRequest.createdAt,
    }));
}
