import { Authorization, Database, Email, IdentityProvider, Logger, SMS } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { createOneByEmailAddress, CreateOneUserByEmailAddressRequest } from './useCases/createOneByEmailAddress.js';
import { createOneByIdentityProvider, CreateOneUserByIdentityProviderRequest } from './useCases/createOneByIdentityProvider.js';
import { createOneByPhoneNumber, CreateOneUserByPhoneNumberRequest } from './useCases/createOneByPhoneNumber.js';
import { findMany } from './useCases/findMany.js';
import { findOneByUserId, FindOneUserByUserIdRequest } from './useCases/findOneByUserId.js';
import { User } from './User.js';

export interface UserService {
    findOneByUserId(context: Authorization.Context, request: FindOneUserByUserIdRequest): Promise<User | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<User[] | undefined>;
    createOneByEmailAddress(context: Authorization.Context, request: CreateOneUserByEmailAddressRequest): Promise<boolean>;
    createOneByPhoneNumber(context: Authorization.Context, request: CreateOneUserByPhoneNumberRequest): Promise<boolean>;
    createOneByIdentityProvider(context: Authorization.Context, request: CreateOneUserByIdentityProviderRequest): Promise<boolean>;
}

export interface CreateUserServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.EmailAdapter;
    emailRendererAdapter: Email.EmailRendererAdapter;
    smsAdapter: SMS.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
}

export function createUserService({
    databaseAdapter,
    logger,
    emailAdapter,
    emailRendererAdapter,
    smsAdapter,
    identityProviderAdapter,
}: CreateUserServiceInput): UserService {
    return {
        findOneByUserId: (context: Authorization.Context, request: FindOneUserByUserIdRequest) =>
            findOneByUserId({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
        createOneByEmailAddress: (context: Authorization.Context, request: CreateOneUserByEmailAddressRequest) =>
            createOneByEmailAddress({ databaseAdapter, logger, emailAdapter, emailRendererAdapter, context, request }),
        createOneByPhoneNumber: (context: Authorization.Context, request: CreateOneUserByPhoneNumberRequest) =>
            createOneByPhoneNumber({ databaseAdapter, logger, smsAdapter, context, request }),
        createOneByIdentityProvider: (context: Authorization.Context, request: CreateOneUserByIdentityProviderRequest) =>
            createOneByIdentityProvider({ databaseAdapter, logger, identityProviderAdapter, context, request }),
    };
}
