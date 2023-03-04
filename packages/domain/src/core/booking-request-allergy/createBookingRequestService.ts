import { Database, Logger } from '../../index.js';

export interface BookingRequestAllergyService {}

export interface CreateBookingRequestAllergyServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createBookingRequestAllergyService({
    databaseAdapter,
    logger,
}: CreateBookingRequestAllergyServiceInput): BookingRequestAllergyService {
    return {};
}
