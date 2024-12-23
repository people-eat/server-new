import { Authorization } from '../../..';
import { type DBGlobalBookingRequest } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';

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

    return globalBookingRequests.map((bookingRequest: DBGlobalBookingRequest) => ({
        globalBookingRequestId: bookingRequest.globalBookingRequestId,
        userId: bookingRequest.userId,
        message: bookingRequest.message,
        conditions: {
            location: {
                text: bookingRequest.locationText,
                latitude: bookingRequest.latitude,
                longitude: bookingRequest.longitude,
            },
            dateTime: bookingRequest.dateTime,
            duration: bookingRequest.duration,
            adultParticipants: bookingRequest.adultParticipants,
            children: bookingRequest.children,
            occasion: bookingRequest.occasion,
            priceClassType: bookingRequest.priceClassType,
        },
        expiresAt: bookingRequest.expiresAt,
        createdAt: bookingRequest.createdAt,
    }));
}
