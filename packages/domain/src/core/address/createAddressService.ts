import { Authorization, Database, Logger } from '../../index.js';
import { Address } from './Address.js';
import { createOne, CreateOneUserRequest } from './useCases/createOne.js';
import { findMany, FindManyAddressesRequest } from './useCases/findMany.js';
import { findOne, FindOneAddressRequest } from './useCases/findOne.js';

export interface AddressService {
    createOne(context: Authorization.Context, request: CreateOneUserRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManyAddressesRequest): Promise<Address[] | undefined>;
    findOne(context: Authorization.Context, request: FindOneAddressRequest): Promise<Address | undefined>;
}

export interface CreateAddressServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createAddressService({ databaseAdapter, logger }: CreateAddressServiceInput): AddressService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneUserRequest) =>
            createOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyAddressesRequest) =>
            findMany({ databaseAdapter, logger, context, request }),
        findOne: (context: Authorization.Context, request: FindOneAddressRequest) => findOne({ databaseAdapter, logger, context, request }),
    };
}
