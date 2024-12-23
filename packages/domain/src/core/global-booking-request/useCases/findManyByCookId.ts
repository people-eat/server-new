import { type Authorization } from '../../..';
import { type DBCook, type DBGlobalBookingRequest } from '../../../data-source';
import { geoDistance } from '../../../utils/geoDistance';
import { type Runtime } from '../../Runtime';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type GlobalBookingRequest } from '../GlobalBookingRequest';
import { toGlobalBookingRequestStatus } from '../toGlobalBookingRequestStatus';

export interface FindManyGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: FindManyRequest & { cookId: NanoId };
}

export async function findManyByCookId({
    runtime: { dataSourceAdapter },
    request: { cookId },
}: FindManyGlobalBookingRequestInput): Promise<GlobalBookingRequest[] | undefined> {
    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId });

    if (!cook) return;

    const globalBookingRequests: DBGlobalBookingRequest[] | undefined = await dataSourceAdapter.globalBookingRequestRepository.findAll();

    if (!globalBookingRequests) return;

    return globalBookingRequests
        .filter((globalBookingRequest: DBGlobalBookingRequest) => {
            // should not be able to see his own global booking request
            if (globalBookingRequest.userId === cookId) return false;

            // should not be able to see expired requests
            if (globalBookingRequest.expiresAt < new Date()) return false;

            // should not be able to see request out of his travel range
            if (cook.maximumTravelDistance) {
                const distance: number = geoDistance({
                    location1: { latitude: cook.latitude, longitude: cook.longitude },
                    location2: { latitude: globalBookingRequest.latitude, longitude: globalBookingRequest.longitude },
                });
                return cook.maximumTravelDistance > distance;
            }

            return true;
        })
        .map((globalBookingRequest: DBGlobalBookingRequest) => ({
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
            // actually not relevant for coo global booking request. Remove after split
            status: toGlobalBookingRequestStatus(dataSourceAdapter, globalBookingRequest),
            expiresAt: globalBookingRequest.expiresAt,
            createdAt: globalBookingRequest.createdAt,
        }));
}
