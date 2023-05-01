import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type EmailAddressUpdate } from '../EmailAddressUpdate';

export interface FindManyEmailAddressUpdatesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId };
}

export async function findOneByUserId({
    dataSourceAdapter,
    logger,
    context,
    request,
}: FindManyEmailAddressUpdatesInput): Promise<EmailAddressUpdate | undefined> {
    const { userId } = request;

    await Authorization.canQueryUserData({ dataSourceAdapter, logger, context, userId });

    const emailAddressUpdate: EmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({ userId });

    if (!emailAddressUpdate) return;

    return emailAddressUpdate;
}
