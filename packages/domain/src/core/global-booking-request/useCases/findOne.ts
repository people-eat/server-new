import { Authorization, type DataSource } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';
import { toGlobalBookingRequestStatus } from '../toGlobalBookingRequestStatus';

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

    return {
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
    };
}
