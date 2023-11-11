import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface DeleteOneGlobalBookingRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { userId: NanoId; globalBookingRequestId: NanoId };
}

export async function deleteOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: DeleteOneGlobalBookingRequestInput): Promise<boolean> {
    const { userId, globalBookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.globalBookingRequestRepository.deleteOne({ userId, globalBookingRequestId });

    return success;
}
