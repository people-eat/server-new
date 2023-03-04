import { Authorization, Database, Logger, Payment } from '../../index.js';
import { BookingRequest } from './BookingRequest.js';
import { CreateOneBookingRequestRequest } from './CreateOneBookingRequestRequest.js';
import { createOne } from './useCases/createOne.js';
import { findMany, FindManyBookingRequestsRequest } from './useCases/findMany.js';

export interface BookingRequestService {
    createOne(
        context: Authorization.Context,
        request: { userId: string; bookingRequest: CreateOneBookingRequestRequest },
    ): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManyBookingRequestsRequest): Promise<BookingRequest[] | undefined>;
}

export interface CreateBookingRequestServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    paymentAdapter: Payment.PaymentProviderAdapter;
}

export function createBookingRequestService({
    databaseAdapter,
    logger,
    paymentAdapter,
}: CreateBookingRequestServiceInput): BookingRequestService {
    return {
        createOne: (context: Authorization.Context, request: { userId: string; bookingRequest: CreateOneBookingRequestRequest }) =>
            createOne({ databaseAdapter, logger, paymentAdapter, context, request }),
        findMany: (context: Authorization.Context, request: FindManyBookingRequestsRequest) =>
            findMany({ databaseAdapter, logger, context, request }),
    };
}
