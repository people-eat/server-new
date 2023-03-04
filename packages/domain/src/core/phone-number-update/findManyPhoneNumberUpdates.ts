import { Authorization, Database, Logger } from '../../index.js';
import { PhoneNumberUpdate } from './PhoneNumberUpdate.js';

export interface FindManyPhoneNumberUpdatesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function findManyPhoneNumberUpdates({
    databaseAdapter,
    logger,
    context,
    request: { userId },
}: FindManyPhoneNumberUpdatesInput): Promise<PhoneNumberUpdate[] | undefined> {
    await Authorization.canQueryUserData({ databaseAdapter, logger, context, userId });

    const phoneNumberUpdates: PhoneNumberUpdate[] | undefined = await databaseAdapter.phoneNumberUpdateRepository.findMany({ userId });

    if (!phoneNumberUpdates) return;

    return phoneNumberUpdates;
}
