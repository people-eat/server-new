import { Authorization } from '../../..';
import { type DBGlobalBookingRequest } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';
import { toGlobalBookingRequestStatus } from '../toGlobalBookingRequestStatus';

export interface FindManyGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findManyByUserId({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { userId },
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const globalBookingRequests: DBGlobalBookingRequest[] | undefined = await dataSourceAdapter.globalBookingRequestRepository.findMany({
        userId,
    });

    if (!globalBookingRequests) return;

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
