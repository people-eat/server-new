import { Authorization, Database, Logger } from '../../../index.js';
import { PhoneNumberUpdate } from '../PhoneNumberUpdate.js';

interface FindManyPhoneNumberUpdatesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindOnePhoneNumberUpdate;
}

export interface FindOnePhoneNumberUpdate {
    userId: string;
}

export async function findOne({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyPhoneNumberUpdatesInput): Promise<PhoneNumberUpdate | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const phoneNumberUpdate: PhoneNumberUpdate | undefined = await databaseAdapter.phoneNumberUpdateRepository.findOne({ userId });

    if (!phoneNumberUpdate) return;

    return phoneNumberUpdate;
}
