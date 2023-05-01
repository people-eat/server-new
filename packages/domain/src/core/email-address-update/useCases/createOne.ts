import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneEmailAddressUpdateRequest } from '../CreateOneEmailAddressUpdateRequest';

interface CreateOneEmailAddressUpdateInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    context: Authorization.Context & { userCreation?: boolean };
    request: CreateOneEmailAddressUpdateRequest;
}

export async function createOne({
    dataSourceAdapter,
    emailAdapter,
    logger,
    webAppUrl,
    context,
    request: { userId, emailAddress },
}: CreateOneEmailAddressUpdateInput): Promise<boolean> {
    if (!context.userCreation) await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const secret: NanoId = createNanoId();

    const persistingSuccess: boolean = await dataSourceAdapter.emailAddressUpdateRepository.insertOne({
        userId,
        emailAddress,
        secret,
        createdAt: new Date(),
    });

    if (!persistingSuccess) return false;

    const emailSendingSuccess: boolean = await emailAdapter.sendToOne(
        'PeopleEat',
        emailAddress,
        'Verify your email address',
        `Secret: ${webAppUrl}/email-address-updates/confirm/${secret}`,
    );

    if (!emailSendingSuccess) return false;

    return true;
}
