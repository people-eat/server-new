import { Authorization, Database, Logger } from '../../index.js';

export async function createOneOneTimeAccessToken(input: {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}): Promise<boolean> {
    return false;
}
