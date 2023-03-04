import { canQueryUserData, Context } from '../../../authorization/index.js';
import { Database, Logger } from '../../../index.js';
import packLocation from '../../packLocation.js';
import { Address } from '../Address.js';

interface FindManyAddressesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Context;
    request: FindManyAddressesRequest;
}

export interface FindManyAddressesRequest {
    userId: string;
}

export async function findMany({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyAddressesInput): Promise<Address[] | undefined> {
    await canQueryUserData({ databaseAdapter, logger, context, userId });

    const addresses: Database.DBAddress[] | undefined = await databaseAdapter.addressRepository.findMany({ userId });

    if (!addresses) return;

    return addresses.map(packLocation);
}
