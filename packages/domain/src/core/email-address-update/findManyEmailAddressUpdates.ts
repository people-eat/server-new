import { Authorization, Database, Logger } from '../../index.js';
import { EmailAddressUpdate } from './EmailAddressUpdate.js';

export interface FindManyEmailAddressUpdatesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: string;
    };
}

export async function findManyEmailAddressUpdates({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyEmailAddressUpdatesInput): Promise<EmailAddressUpdate[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const emailAddressUpdates: EmailAddressUpdate[] | undefined = await databaseAdapter.emailAddressUpdateRepository.findMany({ userId });

    if (!emailAddressUpdates) return;

    return emailAddressUpdates;
}
