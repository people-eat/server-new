import { Authorization, Database, IdentityProvider, Logger } from '../../index.js';
import { IdentityProvider as IdentityProviderEnum, Platform } from '../shared.js';

export interface AssignOneSessionByIdentityProviderInput {
    databaseAdapter: Database.Adapter;
    identityProviderAdapter: IdentityProvider.IdentityProviderAdapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { idToken: string; identityProvider: IdentityProviderEnum; title: string; platform: Platform };
}

export async function assignOneSessionByIdentityProvider({
    databaseAdapter,
    identityProviderAdapter,
    logger,
    context,
    request,
}: AssignOneSessionByIdentityProviderInput): Promise<boolean> {
    const result: IdentityProvider.IdentityProviderResult | undefined = await identityProviderAdapter[request.identityProvider](
        request.idToken,
    );

    if (!result) return false;

    const { emailAddress, phoneNumber } = result;

    const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ emailAddress });

    if (!user) return false;

    if (user.isLocked) return false;

    if (user.failedSignInAttempts > 4) return false;

    const success: boolean = await databaseAdapter.sessionRepository.updateOne(
        { sessionId: context.sessionId },
        { userId: user.userId, title: request.title, platform: request.platform },
    );

    if (!success) return false;

    return true;
}
