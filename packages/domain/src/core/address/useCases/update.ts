import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type CreateOneAddressRequest } from '../CreateOneAddressRequest';

export interface UpdateAddressInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; addressId: NanoId } & CreateOneAddressRequest;
}

export async function update({ dataSourceAdapter, logger, context, request }: UpdateAddressInput): Promise<boolean> {
    const { title, country, city, postCode, street, houseNumber, location, addressId, userId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.addressRepository.updateOne(
        { addressId, userId },
        {
            title: title.trim(),
            country: country.trim(),
            city: city.trim(),
            postCode: postCode.trim(),
            street: street.trim(),
            houseNumber: houseNumber.trim(),
            latitude: location.latitude,
            longitude: location.longitude,
        },
    );

    return success;
}
