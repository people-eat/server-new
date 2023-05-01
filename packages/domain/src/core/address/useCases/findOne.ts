import { Authorization, type DataSource, type Logger } from '../../..';
import packLocation from '../../packLocation';
import { type NanoId } from '../../shared';
import { type Address } from '../Address';

export interface FindOneAddressInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; addressId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneAddressInput): Promise<Address | undefined> {
    const { addressId, userId } = request;

    await Authorization.canQueryUserData({ context, dataSourceAdapter, logger, userId });

    const address: DataSource.DBAddress | undefined = await dataSourceAdapter.addressRepository.findOne({ addressId, userId });

    if (!address) return;

    return packLocation(address);
}
