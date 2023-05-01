import { type Authorization, type DataSource, type IdentityProvider, type Logger } from '../../..';
import { type IdentityProvider as IdentityProviderEnum, type Platform } from '../../shared';

export interface AssignOneSessionByIdentityProviderInput {
    dataSourceAdapter: DataSource.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: AssignOneSessionByIdentityProviderRequest;
}

export interface AssignOneSessionByIdentityProviderRequest {
    idToken: string;
    identityProvider: IdentityProviderEnum;
    title: string;
    platform: Platform;
}

export async function assignOneByIdentityProvider({
    dataSourceAdapter,
    identityProviderAdapter,
    // logger,
    context,
    request,
}: AssignOneSessionByIdentityProviderInput): Promise<boolean> {
    const result: IdentityProvider.IdentityProviderResult | undefined = await identityProviderAdapter[request.identityProvider](
        request.idToken,
    );

    if (!result) return false;

    // const { emailAddress, phoneNumber } = result;
    const { emailAddress } = result;

    const user: DataSource.DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ emailAddress });

    if (!user) return false;

    if (user.isLocked) return false;

    if (user.failedSignInAttempts > 4) return false;

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne(
        { sessionId: context.sessionId },
        { userId: user.userId, title: request.title, platform: request.platform },
    );

    if (!success) return false;

    return true;
}
