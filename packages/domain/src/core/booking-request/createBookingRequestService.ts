import { type Authorization } from '../..';
import { type CreateOneConfiguredMenuRequest } from '../configured-menu';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type Location, type NanoId, type Price } from '../shared';
import { type BookingRequest } from './BookingRequest';
import { type CreateOneBookingRequestRequest, type UserCreateOneBookingRequestResponse } from './CreateOneBookingRequestRequest';
import { acceptOneByCookId } from './useCases/acceptOneByCookId';
import { acceptOneByUserId } from './useCases/acceptOneByUserId';
import { confirmPaymentSetup } from './useCases/confirmPaymentSetup';
import { createOne } from './useCases/createOne';
import { createOneByGlobalBookingRequestId } from './useCases/createOneByGlobalBookingRequestId';
import { createPaymentSetup, type UserBookingRequestCreatePaymentSetupResponse } from './useCases/createPaymentSetup';
import { declineOneByCookId } from './useCases/declineOneByCookId';
import { declineOneByUserId } from './useCases/declineOneByUserId';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findManyByGlobalBookingRequestId } from './useCases/findManyByGlobalBookingRequestId';
import { findManyByUserId } from './useCases/findManyByUserId';
import { findOne } from './useCases/findOne';
import { findOneByCookId } from './useCases/findOneByCookId';
import { findOneByUserId } from './useCases/findOneByUserId';
import { unlockPayment } from './useCases/unlockPayment';
import { updateDateTime } from './useCases/updateDateTime';
import { updateLocation } from './useCases/updateLocation';
import { updateParticipants } from './useCases/updateParticipants';
import { updateSuggestedMenu } from './useCases/updateSuggestedMenu';

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
    findManyByCookId(context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }): Promise<BookingRequest[]>;
    findManyByUserId(context: Authorization.Context, request: FindManyRequest & { userId: NanoId }): Promise<BookingRequest[]>;
    findManyByGlobalBookingRequestId(
        context: Authorization.Context,
        request: FindManyRequest & { userId: NanoId; globalBookingRequestId: NanoId },
    ): Promise<BookingRequest[]>;
    createOne(
        context: Authorization.Context,
        request: CreateOneBookingRequestRequest & { userId: NanoId },
    ): Promise<UserCreateOneBookingRequestResponse>;
    createOneByGlobalBookingRequestId(
        context: Authorization.Context,
        request: { cookId: NanoId; globalBookingRequestId: NanoId; configuredMenu?: CreateOneConfiguredMenuRequest; price?: Price },
    ): Promise<UserCreateOneBookingRequestResponse>;
    acceptOneByCookId(context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    declineOneByCookId(context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    acceptOneByUserId(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    declineOneByUserId(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    updateLocation(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId; location: Location },
    ): Promise<boolean>;
    updateParticipants(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId; adults: number; children: number },
    ): Promise<boolean>;
    updateDateTime(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId; dateTime: Date }): Promise<boolean>;
    confirmPaymentSetup(context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }): Promise<boolean>;
    createPaymentSetup(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId },
    ): Promise<UserBookingRequestCreatePaymentSetupResponse>;
    unlockPayment(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<boolean>;
    updateSuggestedMenu(
        context: Authorization.Context,
        request: { cookId: NanoId; bookingRequestId: NanoId; suggestedMenuId: NanoId },
    ): Promise<boolean>;
}

export function createBookingRequestService(runtime: Runtime): BookingRequestService {
    return {
        findOne: (context: Authorization.Context, request: { bookingRequestId: NanoId }) => findOne({ runtime, context, request }),
        findOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            findOneByCookId({ runtime, context, request }),
        findOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            findOneByUserId({ runtime, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        findManyByCookId: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findManyByCookId({ runtime, context, request }),
        findManyByUserId: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId }) =>
            findManyByUserId({ runtime, context, request }),
        findManyByGlobalBookingRequestId: (
            context: Authorization.Context,
            request: FindManyRequest & { userId: NanoId; globalBookingRequestId: NanoId },
        ) => findManyByGlobalBookingRequestId({ runtime, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneBookingRequestRequest & { userId: NanoId }) =>
            createOne({ runtime, context, request }),
        createOneByGlobalBookingRequestId: (
            context: Authorization.Context,
            request: { cookId: NanoId; globalBookingRequestId: NanoId; configuredMenu?: CreateOneConfiguredMenuRequest; price?: Price },
        ) => createOneByGlobalBookingRequestId({ runtime, context, request }),
        acceptOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByCookId({ runtime, context, request }),
        declineOneByCookId: (context: Authorization.Context, request: { cookId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByCookId({ runtime, context, request }),
        acceptOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            acceptOneByUserId({ runtime, context, request }),
        declineOneByUserId: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            declineOneByUserId({ runtime, context, request }),
        updateDateTime: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId; dateTime: Date }) =>
            updateDateTime({ runtime, context, request }),
        updateLocation: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId; location: Location }) =>
            updateLocation({ runtime, context, request }),
        updateParticipants: (
            context: Authorization.Context,
            request: { userId: NanoId; bookingRequestId: NanoId; adults: number; children: number },
        ) => updateParticipants({ runtime, context, request }),
        confirmPaymentSetup: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            confirmPaymentSetup({ runtime, context, request }),
        createPaymentSetup: (context: Authorization.Context, request: { userId: NanoId; bookingRequestId: NanoId }) =>
            createPaymentSetup({ runtime, context, request }),
        unlockPayment: (context: Authorization.Context, request: { bookingRequestId: NanoId }) =>
            unlockPayment({ runtime, context, request }),
        updateSuggestedMenu: (
            context: Authorization.Context,
            request: { cookId: NanoId; bookingRequestId: NanoId; suggestedMenuId: NanoId },
        ) => updateSuggestedMenu({ runtime, context, request }),
    };
}
