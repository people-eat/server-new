import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import { type FindManyRequest, type NanoId } from '../../shared';
import { type Address } from '../Address';

export interface FindManyAddressesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId };
}

export async function findMany({ dataSourceAdapter, logger, context, request }: FindManyAddressesInput): Promise<Address[] | undefined> {
    const { userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const addresses: DataSource.DBAddress[] | undefined = await dataSourceAdapter.addressRepository.findMany({ userId });

    if (!addresses) return;

    return addresses.map(packLocation);
}
