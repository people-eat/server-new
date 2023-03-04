import { Authorization, Database, IdentityProvider, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';
import { IdentityProvider as IdentityProviderEnum } from '../../shared.js';
import { CreateOneUserRequest } from '../CreateOneUserRequest.js';

export interface CreateOneUserByIdentityProviderInput {
    databaseAdapter: Database.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneUserByIdentityProviderRequest;
}

export type CreateOneUserByIdentityProviderRequest = CreateOneUserRequest & { identityProvider: IdentityProviderEnum; idToken: string };

export async function createOneByIdentityProvider({
    databaseAdapter,
    identityProviderAdapter,
    request,
}: CreateOneUserByIdentityProviderInput): Promise<boolean> {
    const result: IdentityProvider.IdentityProviderResult | undefined = await identityProviderAdapter[request.identityProvider](
        request.idToken,
    );

    if (!result) return false;

    const { emailAddress, phoneNumber } = result;

    const userId: string = createNanoId();

    const success: boolean = await databaseAdapter.userRepository.insertOne({
        userId: userId,
        isLocked: false,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        password: undefined,
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

    return success;
}
