import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneGlobalBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId; globalBookingRequestId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneGlobalBookingRequestInput): Promise<boolean> {
    const { userId, globalBookingRequestId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.globalBookingRequestRepository.deleteOne({ userId, globalBookingRequestId });

    return success;
}
