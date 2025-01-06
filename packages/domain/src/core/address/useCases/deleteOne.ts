import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface DeleteOneAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; addressId: NanoId };
}

export async function deleteOne({
    runtime: { dataSourceAdapter, logger, publisher },
    context,
    request,
}: DeleteOneAddressInput): Promise<boolean> {
    const { userId, addressId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.addressRepository.deleteOne({ userId, addressId });

    if (success) await publisher.publish(userId, { sessionUpdates: {} });

    return success;
}
