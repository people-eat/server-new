import { Authorization, type DataSource, type Logger } from '../../..';
import { type PhoneNumberUpdate } from '../PhoneNumberUpdate';

interface FindManyPhoneNumberUpdatesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: string };
}

export async function findOneByUserId({
    dataSourceAdapter,
    logger,
    context,
    request: { userId },
}: FindManyPhoneNumberUpdatesInput): Promise<PhoneNumberUpdate | undefined> {
    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const phoneNumberUpdate: PhoneNumberUpdate | undefined = await dataSourceAdapter.phoneNumberUpdateRepository.findOne({ userId });

    if (!phoneNumberUpdate) return;

    return phoneNumberUpdate;
}
