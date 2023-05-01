import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneAddressRequest } from '../CreateOneAddressRequest';

export interface CreateOneAddressInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneAddressRequest & { userId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneAddressInput): Promise<boolean> {
    const { title, country, city, postCode, street, houseNumber, location, userId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const addressId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.addressRepository.insertOne({
        addressId,
        userId: userId.trim(),
        title: title.trim(),
        country: country.trim(),
        city: city.trim(),
        postCode: postCode.trim(),
        street: street.trim(),
        houseNumber: houseNumber.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
        createdAt: new Date(),
    });

    return success;
}
