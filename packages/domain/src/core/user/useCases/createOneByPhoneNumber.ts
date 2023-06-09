import bcrypt from 'bcryptjs';
import { type Authorization, type DataSource, type Logger, type SMS } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { createOne as createOneAddress } from '../../address/useCases/createOne';
import { createOne as createOneCook } from '../../cook/useCases/createOne';
import { createOne as createOnePhoneNumberUpdate } from '../../phone-number-update/useCases/createOne';
import { type NanoId } from '../../shared';
import { type CreateOneUserByPhoneNumberRequest } from '../CreateOneUserRequest';

export interface CreateOneUserByPhoneNumberInput {
    dataSourceAdapter: DataSource.Adapter;
    smsAdapter: SMS.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    request: CreateOneUserByPhoneNumberRequest;
}

export async function createOneByPhoneNumber({
    dataSourceAdapter,
    smsAdapter,
    logger,
    webAppUrl,
    context,
    request,
}: CreateOneUserByPhoneNumberInput): Promise<boolean> {
    const { phoneNumber, password, firstName, lastName, language, gender, birthDate, cook, addresses } = request;

    const userId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.userRepository.insertOne({
        userId,
        isLocked: false,
        emailAddress: undefined,
        phoneNumber: phoneNumber,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        failedSignInAttempts: 0,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        language,
        gender,
        birthDate,
        profilePictureUrl: undefined,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) return false;

    const smsSuccess: boolean = await createOnePhoneNumberUpdate({
        dataSourceAdapter,
        smsAdapter,
        logger,
        webAppUrl,
        context,
        request: { userId, phoneNumber: phoneNumber.trim() },
    });

    if (!smsSuccess) return false;

    if (addresses)
        for (const address of addresses) await createOneAddress({ dataSourceAdapter, logger, context, request: { userId, ...address } });

    if (cook) await createOneCook({ dataSourceAdapter, logger, context, request: { cookId: userId, ...cook } });

    return true;
}
