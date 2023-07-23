import { type Authorization, type ConfiguredMenu, type DataSource, type Logger } from '../..';
import { type NanoId } from '../shared';
import { findOne } from './useCases/findOne';

export interface ConfiguredMenuService {
    findOne(context: Authorization.Context, request: { bookingRequestId: NanoId }): Promise<ConfiguredMenu | undefined>;
}

export interface CreateConfiguredMenuServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createConfiguredMenuService({ dataSourceAdapter, logger }: CreateConfiguredMenuServiceInput): ConfiguredMenuService {
    return {
        findOne: (context: Authorization.Context, request: { bookingRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
    };
}
