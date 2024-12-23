import { Authorization } from '../../..';
import { type DBGlobalBookingRequest } from '../../../data-source';
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

    const globalBookingRequests: DBGlobalBookingRequest[] | undefined = await dataSourceAdapter.globalBookingRequestRepository.findMany({
        userId,
    });

    if (!globalBookingRequests) return;

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
