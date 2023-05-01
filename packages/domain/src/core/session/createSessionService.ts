import { type Authorization, type DataSource, type IdentityProvider, type Logger } from '../..';
import { type Session } from './Session';
import { assignOneByEmailAddress, type AssignOneSessionByEmailAddressRequest } from './useCases/assignOneByEmailAddress';
import { assignOneByIdentityProvider, type AssignOneSessionByIdentityProviderRequest } from './useCases/assignOneByIdentityProvider';
import { assignOneByPhoneNumber, type AssignOneSessionByPhoneNumberRequest } from './useCases/assignOneByPhoneNumber';
import { expireOne, type ExpireOneSessionRequest } from './useCases/expireOne';
import { findMany, type FindManySessionsRequest } from './useCases/findMany';

export interface SessionService {
    assignOneByEmailAddress(context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest): Promise<boolean>;
    assignOneByIdentityProvider(context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest): Promise<boolean>;
    assignOneByPhoneNumber(context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest): Promise<boolean>;
    expireOne(context: Authorization.Context, request: ExpireOneSessionRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManySessionsRequest): Promise<Session[] | undefined>;
}

export interface CreateSessionServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
}

export function createSessionService({ dataSourceAdapter, logger, identityProviderAdapter }: CreateSessionServiceInput): SessionService {
    return {
        assignOneByEmailAddress: (context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest) =>
            assignOneByEmailAddress({ dataSourceAdapter, logger, context, request }),
        assignOneByIdentityProvider: (context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest) =>
            assignOneByIdentityProvider({ dataSourceAdapter, logger, identityProviderAdapter, context, request }),
        assignOneByPhoneNumber: (context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest) =>
            assignOneByPhoneNumber({ dataSourceAdapter, logger, context, request }),
        expireOne: (context: Authorization.Context, request: ExpireOneSessionRequest) =>
            expireOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManySessionsRequest) =>
            findMany({ dataSourceAdapter, logger, context, request }),
    };
}
