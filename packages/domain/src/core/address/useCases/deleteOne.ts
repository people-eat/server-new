import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneAddressInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; addressId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneAddressInput): Promise<boolean> {
    const { userId, addressId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.addressRepository.deleteOne({ userId, addressId });

    return success;
}
