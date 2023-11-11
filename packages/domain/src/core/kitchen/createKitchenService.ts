import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneKitchenRequest } from './CreateOneKitchenRequest';
import { type Kitchen } from './Kitchen';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface KitchenService {
    findOne(context: Authorization.Context, request: { kitchenId: NanoId }): Promise<Kitchen | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Kitchen[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneKitchenRequest): Promise<boolean>;
}

export function createKitchenService({ dataSourceAdapter, logger }: Runtime): KitchenService {
    return {
        findOne: (context: Authorization.Context, request: { kitchenId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneKitchenRequest) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
