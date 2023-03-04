import { Authorization, Database, IdentityProvider, Logger } from '../../index.js';
import { Session } from './Session.js';
import { assignOneByEmailAddress, AssignOneSessionByEmailAddressRequest } from './useCases/assignOneByEmailAddress.js';
import { assignOneByIdentityProvider, AssignOneSessionByIdentityProviderRequest } from './useCases/assignOneByIdentityProvider.js';
import { assignOneByPhoneNumber, AssignOneSessionByPhoneNumberRequest } from './useCases/assignOneByPhoneNumber.js';
import { expireOne, ExpireOneSessionRequest } from './useCases/expireOne.js';
import { findMany, FindManySessionsRequest } from './useCases/findMany.js';

export interface SessionService {
    assignOneByEmailAddress(context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest): Promise<boolean>;
    assignOneByIdentityProvider(context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest): Promise<boolean>;
    assignOneByPhoneNumber(context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest): Promise<boolean>;
    expireOne(context: Authorization.Context, request: ExpireOneSessionRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManySessionsRequest): Promise<Session[] | undefined>;
}

export interface CreateSessionServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
}

export function createSessionService({ databaseAdapter, logger, identityProviderAdapter }: CreateSessionServiceInput): SessionService {
    return {
        assignOneByEmailAddress: (context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest) =>
            assignOneByEmailAddress({ databaseAdapter, logger, context, request }),
        assignOneByIdentityProvider: (context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest) =>
            assignOneByIdentityProvider({ databaseAdapter, logger, identityProviderAdapter, context, request }),
        assignOneByPhoneNumber: (context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest) =>
            assignOneByPhoneNumber({ databaseAdapter, logger, context, request }),
        expireOne: (context: Authorization.Context, request: ExpireOneSessionRequest) =>
            expireOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManySessionsRequest) =>
            findMany({ databaseAdapter, logger, context, request }),
    };
}
