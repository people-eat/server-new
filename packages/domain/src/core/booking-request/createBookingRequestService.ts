import { type Authorization, type DataSource, type Email, type Logger, type PaymentProvider } from '../..';
import { type Publisher } from '../Service';
import { type FindManyRequest, type NanoId, type Price } from '../shared';
import { type BookingRequest } from './BookingRequest';
import { type CreateOneBookingRequestRequest } from './CreateOneBookingRequestRequest';
import { acceptOneByCookId } from './useCases/acceptOneByCookId';
import { acceptOneByUserId } from './useCases/acceptOneByUserId';
import { confirmPaymentSetup } from './useCases/confirmPaymentSetup';
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
    createOne(
        context: Authorization.Context,
        request: CreateOneBookingRequestRequest & { userId: NanoId },
    ): Promise<{
        success: boolean;
        clientSecret: string;
        bookingRequestId: string;
    }>;
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
    confirmPaymentSetup(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
}

export interface CreateBookingRequestServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    emailAdapter: Email.Adapter;
    webAppUrl: string;
    publisher: Publisher;
    logger: Logger.Adapter;
}

export function createBookingRequestService({
    dataSourceAdapter,
    paymentAdapter,
    emailAdapter,
    webAppUrl,
    publisher,
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
            createOne({ dataSourceAdapter, logger, webAppUrl, context, request, emailAdapter, paymentAdapter }),
        createOneByGlobalBookingRequestId: (context: Authorization.Context, request: { cookId: NanoId; globalBookingRequestId: NanoId }) =>
            createOneByGlobalBookingRequestId({ dataSourceAdapter, logger, webAppUrl, context, request, emailAdapter }),
        acceptOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByCookId({ dataSourceAdapter, logger, context, publisher, request, paymentAdapter }),
        declineOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByCookId({ dataSourceAdapter, logger, context, publisher, request }),
        acceptOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByUserId({ dataSourceAdapter, logger, context, publisher, request }),
        declineOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByUserId({ dataSourceAdapter, logger, context, publisher, request }),
        updatePriceByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId; price: Price }) =>
            updatePriceByCookId({ dataSourceAdapter, logger, context, request }),
        updatePriceByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId; price: Price }) =>
            updatePriceByUserId({ dataSourceAdapter, logger, context, request }),
        confirmPaymentSetup: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            confirmPaymentSetup({ dataSourceAdapter, logger, webAppUrl, emailAdapter, context, request }),
    };
}
