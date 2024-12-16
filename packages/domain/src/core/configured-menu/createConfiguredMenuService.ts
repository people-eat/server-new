import { type Authorization, type ConfiguredMenu } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateOneConfiguredMenuRequest } from './CreateOneConfiguredMenuRequest';
import { createOne } from './useCases/createOne';
import { findOne } from './useCases/findOne';

export interface ConfiguredMenuService {
    findOne(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<ConfiguredMenu | undefined>;
    createOne(
        context: Authorization.Context,
        request: { bookingRequestId: NanoId; configuredMenu: CreateOneConfiguredMenuRequest },
    ): Promise<boolean>;
}

export function createConfiguredMenuService({ dataSourceAdapter, logger }: Runtime): ConfiguredMenuService {
    return {
        findOne: (context: Authorization.Context, request: { bookingRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        createOne: (
            context: Authorization.Context,
            request: { bookingRequestId: NanoId; configuredMenu: CreateOneConfiguredMenuRequest },
        ) => createOne({ dataSourceAdapter, logger, context, request }),
    };
}
