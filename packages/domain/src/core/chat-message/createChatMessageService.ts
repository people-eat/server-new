import { Database, Logger } from '../../index.js';

export interface ChatMessageService {}

export interface CreateChatMessageServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createChatMessageService({ databaseAdapter, logger }: CreateChatMessageServiceInput): ChatMessageService {
    return {};
}
