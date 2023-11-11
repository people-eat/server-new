import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneSupportRequestRequest } from '../CreateOneSupportRequestRequest';

export interface CreateOneSupportRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneSupportRequestRequest & { userId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneSupportRequestInput): Promise<boolean> {
    const { userId, bookingRequestId, subject, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const supportRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.supportRequestRepository.insertOne({
        supportRequestId,
        userId,
        bookingRequestId,
        subject,
        message,
        createdAt: new Date(),
    });

    return success;
}
