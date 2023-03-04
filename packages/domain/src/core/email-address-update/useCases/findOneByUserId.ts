import { Authorization, Database, Logger } from '../../../index.js';
import { EmailAddressUpdate } from '../EmailAddressUpdate.js';

export interface FindManyEmailAddressUpdatesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyEmailAddressUpdatesRequest;
}

export interface FindManyEmailAddressUpdatesRequest {
    userId: string;
}

export async function findOneByUserId({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyEmailAddressUpdatesInput): Promise<EmailAddressUpdate | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const emailAddressUpdate: EmailAddressUpdate | undefined = await databaseAdapter.emailAddressUpdateRepository.findOne({ userId });

    if (!emailAddressUpdate) return;

    return emailAddressUpdate;
}
