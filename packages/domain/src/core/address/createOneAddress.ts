import { Authorization, Database, Logger } from '../../index.js';
import createNanoId from '../../utils/createNanoId.js';
import { CreateOneAddressRequest } from './CreateOneAddressRequest.js';

export interface CreateOneAddressInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string; address: CreateOneAddressRequest };
}

export async function createOneAddress({
    databaseAdapter,
    logger,
    context,
    request: { userId, address },
}: CreateOneAddressInput): Promise<boolean> {
    await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    const addressId: string = createNanoId();

    const { title, country, city, postCode, street, houseNumber, location } = address;

    const success: boolean = await databaseAdapter.addressRepository.insertOne({
        addressId,
        userId,
        title,
        country,
        city,
        postCode,
        street,
        houseNumber,
        latitude: location.latitude,
        longitude: location.longitude,
        createdAt: new Date(),
    });

    return success;
}
