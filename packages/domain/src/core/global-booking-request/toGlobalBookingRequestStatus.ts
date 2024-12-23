import { type DataSource } from '../..';
import { type DBGlobalBookingRequest } from '../../data-source';
import { type GlobalBookingRequestStatus } from './GlobalBookingRequest';

export function toGlobalBookingRequestStatus(
    _dataSourceAdapter: DataSource.Adapter,
    globalBookingRequest: DBGlobalBookingRequest,
): GlobalBookingRequestStatus {
    // const bookingRequests: DBBookingRequest[] | undefined = await dataSourceAdapter.bookingRequestRepository.findMany({
    //     globalBookingRequestId: globalBookingRequest.globalBookingRequestId,
    // });

    if (globalBookingRequest.expiresAt < new Date()) return 'EXPIRED';

    return 'OPEN';
}
