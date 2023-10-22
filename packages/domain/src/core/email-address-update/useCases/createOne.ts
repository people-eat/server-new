import { confirmEmailAddress } from '@people-eat/server-adapter-email-template';
import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBEmailAddressUpdate } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneEmailAddressUpdateRequest } from '../CreateOneEmailAddressUpdateRequest';

interface CreateOneEmailAddressUpdateInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
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
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const emailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });

    if (emailAddressUpdate) return false;

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
        'Email Adresse bestätigen',
        confirmEmailAddress({ webAppUrl, secret }),
    );

    if (!emailSendingSuccess) return false;

    return true;
}
