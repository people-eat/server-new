import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBPhoneNumberUpdate } from '../../../data-source';
import { type NanoId } from '../../shared';

interface CreateOnePhoneNumberUpdateInput {
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
}: CreateOnePhoneNumberUpdateInput): Promise<boolean> {
    const phoneNumberUpdate: DBPhoneNumberUpdate | undefined = await dataSourceAdapter.phoneNumberUpdateRepository.findOne({ secret });

    if (!phoneNumberUpdate) return false;

    const { userId, phoneNumber } = phoneNumberUpdate;

    const userUpdateSuccess: boolean = await dataSourceAdapter.userRepository.updateOne({ userId }, { phoneNumber });

    if (!userUpdateSuccess) return false;

    const deletionSuccess: boolean = await dataSourceAdapter.phoneNumberUpdateRepository.deleteOne({ secret });

    if (!deletionSuccess) logger.error(`Could not delete phone number update with secret ${secret} for user ${userId}`);

    const { sessionId } = context;

    await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });

    return true;
}
