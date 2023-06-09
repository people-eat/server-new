import { type DBPhoneNumberUpdate } from '../../../data-source/index.js';
import { Authorization, type DataSource, type Logger, type SMS } from '../../../index.js';
import { createNanoId } from '../../../utils/createNanoId.js';
import { type NanoId } from '../../shared.js';
import { type CreateOnePhoneNumberUpdateRequest } from '../CreateOnePhoneNumberUpdateRequest.js';

interface CreateOnePhoneNumberUpdateInput {
    dataSourceAdapter: DataSource.Adapter;
    smsAdapter: SMS.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    request: CreateOnePhoneNumberUpdateRequest;
}

export async function createOne({
    dataSourceAdapter,
    // smsAdapter,
    logger,
    // webAppUrl,
    context,
    request: { userId, phoneNumber },
}: CreateOnePhoneNumberUpdateInput): Promise<boolean> {
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const phoneNumberUpdate: DBPhoneNumberUpdate | undefined = await dataSourceAdapter.phoneNumberUpdateRepository.findOne({ phoneNumber });

    if (phoneNumberUpdate) return false;

    const secret: NanoId = createNanoId();

    const persistingSuccess: boolean = await dataSourceAdapter.phoneNumberUpdateRepository.insertOne({
        userId,
        phoneNumber,
        secret,
        createdAt: new Date(),
    });

    if (!persistingSuccess) return false;

    // const smsSendingSuccess: boolean = await smsAdapter.sendToOne(
    //     phoneNumber,
    //     `Verify your phone number!\nSecret: ${webAppUrl}/phone-number-updates/confirm/${secret}`,
    // );

    // if (!smsSendingSuccess) return false;

    return true;
}
