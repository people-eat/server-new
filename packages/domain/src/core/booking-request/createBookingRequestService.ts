import { type Authorization, type DataSource, type Email, type Logger } from '../..';
import { type FindManyRequest, type NanoId, type Price } from '../shared';
import { type BookingRequest } from './BookingRequest';
import { type CreateOneBookingRequestRequest } from './CreateOneBookingRequestRequest';
import { acceptOneByCookId } from './useCases/acceptOneByCookId';
import { acceptOneByUserId } from './useCases/acceptOneByUserId';
import { createOne } from './useCases/createOne';
import { createOneByGlobalBookingRequestId } from './useCases/createOneByGlobalBookingRequestId';
import { declineOneByCookId } from './useCases/declineOneByCookId';
import { declineOneByUserId } from './useCases/declineOneByUserId';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findManyByUserId } from './useCases/findManyByUserId';
import { findOne } from './useCases/findOne';
import { findOneByCookId } from './useCases/findOneByCookId';
import { findOneByUserId } from './useCases/findOneByUserId';
import { updatePriceByCookId } from './useCases/updatePriceByCookId';
import { updatePriceByUserId } from './useCases/updatePriceByUserId';

export interface BookingRequestService {
    findOne(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<BookingRequest | undefined>;
    findOneByCookId(
        context: Authorization.Context,
        request: { cookId: NanoId; bookingRequestId: NanoId },
    ): Promise<BookingRequest | undefined>;
    findOneByUserId(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId },
    ): Promise<BookingRequest | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<BookingRequest[] | undefined>;
    findManyByCookId(context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }): Promise<BookingRequest[] | undefined>;
    findManyByUserId(context: Authorization.Context, request: FindManyRequest & { userId: NanoId }): Promise<BookingRequest[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneBookingRequestRequest & { userId: NanoId }): Promise<boolean>;
    createOneByGlobalBookingRequestId(
        context: Authorization.Context,
        request: { cookId: NanoId; globalBookingRequestId: NanoId },
    ): Promise<boolean>;
    acceptOneByCookId(context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    declineOneByCookId(context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    acceptOneByUserId(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    declineOneByUserId(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    updatePriceByCookId(
        context: Authorization.Context,
        request: { cookId: NanoId; bookingRequestId: NanoId; price: Price },
    ): Promise<boolean>;
    updatePriceByUserId(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId; price: Price },
    ): Promise<boolean>;
}

export interface CreateBookingRequestServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
}

export function createBookingRequestService({
    dataSourceAdapter,
    emailAdapter,
    logger,
}: CreateBookingRequestServiceInput): BookingRequestService {
    return {
        findOne: (context: Authorization.Context, request: { bookingRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            findOneByCookId({ dataSourceAdapter, logger, context, request }),
        findOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            findOneByUserId({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        findManyByCookId: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findManyByCookId({ dataSourceAdapter, logger, context, request }),
        findManyByUserId: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId }) =>
            findManyByUserId({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneBookingRequestRequest & { userId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request, emailAdapter }),
        createOneByGlobalBookingRequestId: (context: Authorization.Context, request: { cookId: NanoId; globalBookingRequestId: NanoId }) =>
            createOneByGlobalBookingRequestId({ dataSourceAdapter, logger, context, request, emailAdapter }),
        acceptOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByCookId({ dataSourceAdapter, logger, context, request }),
        declineOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByCookId({ dataSourceAdapter, logger, context, request }),
        acceptOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByUserId({ dataSourceAdapter, logger, context, request }),
        declineOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByUserId({ dataSourceAdapter, logger, context, request }),
        updatePriceByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId; price: Price }) =>
            updatePriceByCookId({ dataSourceAdapter, logger, context, request }),
        updatePriceByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId; price: Price }) =>
            updatePriceByUserId({ dataSourceAdapter, logger, context, request }),
    };
}
