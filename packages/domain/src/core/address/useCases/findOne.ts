import { Authorization, Database, Logger } from '../../../index.js';
import packLocation from '../../packLocation.js';
import { Address } from '../Address.js';

interface FindOneAddressInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOneAddressRequest;
}

export interface FindOneAddressRequest {
    userId: string;
    addressId: string;
}

export async function findOne({
    databaseAdapter,
    logger,
    context,
    request: { userId, addressId },
}: FindOneAddressInput): Promise<Address | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const address: Database.DBAddress | undefined = await databaseAdapter.addressRepository.findOne({ userId, addressId });

    if (!address) return;

    return packLocation(address);
}
