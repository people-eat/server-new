import { type Authorization, type ConfiguredMenu } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { findOne } from './useCases/findOne';

export interface ConfiguredMenuService {
    findOne(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<ConfiguredMenu | undefined>;
}

export function createConfiguredMenuService({ dataSourceAdapter, logger }: Runtime): ConfiguredMenuService {
    return {
        findOne: (context: Authorization.Context, request: { bookingRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
    };
}
