import { Authorization, Database, Logger } from '../../index.js';
import { CreateOneCookRequest } from './CreateOneCookRequest.js';

export interface CreateOneCookInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCookRequest;
}

export async function createOneCook({ databaseAdapter, request }: CreateOneCookInput): Promise<boolean> {
    return false;
}
