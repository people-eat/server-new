import { type Authorization, type ChatMessage, type DataSource, type Email, type Logger } from '../..';
import { type Publisher } from '../Service';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneChatMessageRequest } from './CreateOneChatMessageRequest';
import { createOneByCookId } from './useCases/createOneByCookId';
import { createOneByUserId } from './useCases/createOneByUserId';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findManyByUserId } from './useCases/findManyByUserId';

export interface ChatMessageService {
    findManyByCookId(
        context: Authorization.Context,
        request: FindManyRequest & { cookId: NanoId; bookingRequestId: NanoId },
    ): Promise<ChatMessage[] | undefined>;
    findManyByUserId(
        context: Authorization.Context,
        request: FindManyRequest & { userId: NanoId; bookingRequestId: NanoId },
    ): Promise<ChatMessage[] | undefined>;

    createOneByCookId(
        context: Authorization.Context,
        request: { cookId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest,
    ): Promise<boolean>;
    createOneByUserId(
        context: Authorization.Context,
        request: { userId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest,
    ): Promise<boolean>;
}

export interface CreateChatMessageServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    publisher: Publisher;
}

export function createChatMessageService({
    dataSourceAdapter,
    logger,
    emailAdapter,
    webAppUrl,
    publisher,
}: CreateChatMessageServiceInput): ChatMessageService {
    return {
        findManyByCookId: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId; bookingRequestId: NanoId }) =>
            findManyByCookId({ dataSourceAdapter, logger, context, request }),
        findManyByUserId: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId; bookingRequestId: NanoId }) =>
            findManyByUserId({ dataSourceAdapter, logger, context, request }),

        createOneByCookId: (
            context: Authorization.Context,
            request: { cookId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest,
        ) => createOneByCookId({ dataSourceAdapter, logger, emailAdapter, webAppUrl, context, publisher, request }),
        createOneByUserId: (
            context: Authorization.Context,
            request: { userId: NanoId; bookingRequestId: NanoId } & CreateOneChatMessageRequest,
        ) => createOneByUserId({ dataSourceAdapter, logger, emailAdapter, webAppUrl, context, publisher, request }),
    };
}
