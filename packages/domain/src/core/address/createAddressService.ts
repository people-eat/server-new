import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type Address } from './Address';
import { type CreateOneAddressRequest } from './CreateOneAddressRequest';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';
import { update } from './useCases/update';

export interface AddressService {
    findOne(context: Authorization.Context, request: { userId: NanoId; addressId: NanoId }): Promise<Address | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest & { userId: NanoId }): Promise<Address[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneAddressRequest & { userId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { userId: NanoId; addressId: NanoId }): Promise<boolean>;
    update(context: Authorization.Context, request: { userId: NanoId; addressId: NanoId } & CreateOneAddressRequest): Promise<boolean>;
}

export function createAddressService({ dataSourceAdapter, logger }: Runtime): AddressService {
    return {
        findOne: (context: Authorization.Context, request: { userId: NanoId; addressId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId }) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneAddressRequest & { userId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { userId: NanoId; addressId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
        update: (context: Authorization.Context, request: { userId: NanoId; addressId: NanoId } & CreateOneAddressRequest) =>
            update({ dataSourceAdapter, logger, context, request }),
    };
}
