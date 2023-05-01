import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBEmailAddressUpdate } from '../../../data-source';
import { type NanoId } from '../../shared';

interface CreateOneEmailAddressUpdateInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context & { userCreation?: boolean };
    request: { secret: NanoId };
}

export async function confirmOne({
    dataSourceAdapter,
    logger,
    context,
    request: { secret },
}: CreateOneEmailAddressUpdateInput): Promise<boolean> {
    const emailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({ secret });

    if (!emailAddressUpdate) return false;

    const { userId, emailAddress } = emailAddressUpdate;

    const userUpdateSuccess: boolean = await dataSourceAdapter.userRepository.updateOne({ userId }, { emailAddress });

    if (!userUpdateSuccess) return false;

    const deletionSuccess: boolean = await dataSourceAdapter.emailAddressUpdateRepository.deleteOne({ secret });

    if (!deletionSuccess) logger.error(`Could not delete email address update with secret ${secret} for user ${userId}`);

    const { sessionId } = context;

    await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });

    return true;
}
