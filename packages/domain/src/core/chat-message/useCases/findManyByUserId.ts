import { type Authorization, type ChatMessage, type DataSource, type Logger } from '../../..';
import { type DBChatMessage } from '../../../data-source';
import { type FindManyRequest, type NanoId } from '../../shared';

export interface FindManyBookingRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest & { userId: NanoId; bookingRequestId: NanoId };
}

export async function findManyByUserId({ dataSourceAdapter, request }: FindManyBookingRequestInput): Promise<ChatMessage[] | undefined> {
    const { bookingRequestId } = request;

    // await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    // const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
    //     userId,
    //     bookingRequestId,
    // });

    // if (!bookingRequest) return undefined;

    const chatMessages: DBChatMessage[] | undefined = await dataSourceAdapter.chatMessageRepository.findMany({ bookingRequestId });

    return chatMessages;
}
