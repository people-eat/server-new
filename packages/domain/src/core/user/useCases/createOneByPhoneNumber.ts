import bcrypt from 'bcryptjs';
import { Authorization, Database, Logger, SMS } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';
import { createOne as createOnePhoneNumberUpdate } from '../../phone-number-update/index.js';
import { CreateOneUserRequest } from '../CreateOneUserRequest.js';

export interface CreateOneUserByPhoneNumberInput {
    databaseAdapter: Database.Adapter;
    smsAdapter: SMS.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneUserByPhoneNumberRequest;
}

export type CreateOneUserByPhoneNumberRequest = CreateOneUserRequest & { phoneNumber: string; password: string };

export async function createOneByPhoneNumber({
    databaseAdapter,
    smsAdapter,
    logger,
    context,
    request,
}: CreateOneUserByPhoneNumberInput): Promise<boolean> {
    const userId: string = createNanoId();

    const success: boolean = await databaseAdapter.userRepository.insertOne({
        userId: userId,
        isLocked: false,
        emailAddress: undefined,
        phoneNumber: request.phoneNumber,
        password: bcrypt.hashSync(request.password, bcrypt.genSaltSync()),
        failedSignInAttempts: 0,
        firstName: request.firstName,
        lastName: request.lastName,
        language: request.language,
        gender: request.gender,
        birthDate: request.birthDate,
        profilePictureUrl: undefined,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) return false;

    const smsSuccess: boolean = await createOnePhoneNumberUpdate({
        databaseAdapter,
        smsAdapter,
        logger,
        context: { ...context, userCreation: true },
        request: { userId, phoneNumber: request.phoneNumber },
    });

    if (!smsSuccess) return false;

    return true;
}
