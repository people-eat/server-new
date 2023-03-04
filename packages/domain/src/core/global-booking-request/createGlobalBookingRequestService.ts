import { Database, Logger } from '../../index.js';

export interface GlobalBookingRequestService {}

export interface CreateGlobalBookingRequestServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createGlobalBookingRequestService({
    databaseAdapter,
    logger,
}: CreateGlobalBookingRequestServiceInput): GlobalBookingRequestService {
    return {};
}
