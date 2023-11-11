import { type Authorization } from '../../..';
import { type IdentityProviderResult } from '../../../identity-provider/Adapter';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneUserByIdentityProviderRequest } from '../CreateOneUserRequest';

export interface CreateOneUserByIdentityProviderInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneUserByIdentityProviderRequest;
}

export async function createOneByIdentityProvider({
    runtime: { dataSourceAdapter, identityProviderAdapter },
    request,
}: CreateOneUserByIdentityProviderInput): Promise<boolean> {
    const result: IdentityProviderResult | undefined = await identityProviderAdapter[request.identityProvider](request.idToken);

    if (!result) return false;

    const { emailAddress, phoneNumber } = result;

    const { firstName, lastName, language, gender, birthDate } = request;

    const userId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.userRepository.insertOne({
        userId,
        isLocked: false,
        emailAddress,
        phoneNumber,
        password: undefined,
        failedSignInAttempts: 0,
        firstName,
        lastName,
        language,
        gender,
        birthDate,
        profilePictureUrl: undefined,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) return false;

    return true;
}
