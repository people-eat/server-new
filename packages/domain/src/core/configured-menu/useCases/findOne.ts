import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBConfiguredMenu } from '../../../data-source';
import { type NanoId } from '../../shared';
import { type ConfiguredMenu } from '../ConfiguredMenu';

export interface FindOneConfiguredMenuInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { bookingRequestId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOneConfiguredMenuInput): Promise<ConfiguredMenu | undefined> {
    const { bookingRequestId } = request;

    const configuredMenu: DBConfiguredMenu | undefined = await dataSourceAdapter.configuredMenuRepository.findOne({ bookingRequestId });

    if (!configuredMenu) return;

    return configuredMenu;
}
