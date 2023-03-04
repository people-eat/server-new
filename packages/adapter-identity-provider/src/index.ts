import { IdentityProvider, Logger } from '@people-eat/server-domain';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { JwksClient } from 'jwks-rsa';

export interface CreateIdentityProviderAdapterInput {
    logger: Logger.Adapter;
    googleClientId: string;
    appleBundleIdentifier: string;
}

export function createIdentityProviderAdapter({
    logger,
    googleClientId,
    appleBundleIdentifier,
}: CreateIdentityProviderAdapterInput): IdentityProvider.IdentityProviderAdapter {
    return {
        APPLE: async (idToken: string): Promise<IdentityProvider.IdentityProviderResult | undefined> => {
            try {
                const { header } = this.jwtService.decode(idToken, { complete: true }) as { header: { kid: string } };
                const jwksClient: JwksClient = new JwksClient({ jwksUri: 'https://appleid.apple.com/auth/keys' });
                const applePublicKey: string = (await jwksClient.getSigningKey(header.kid)).getPublicKey();
                const { aud, email: emailAddress } = this.jwtService.verify(idToken, { publicKey: applePublicKey });

                if (appleBundleIdentifier !== aud) throw new Error('Apple id token not issued for this service');
                return { emailAddress };
            } catch {
                return undefined;
            }
        },
        GOOGLE: async (idToken: string): Promise<IdentityProvider.IdentityProviderResult | undefined> => {
            // for manual testing: https://oauth2.googleapis.com/tokeninfo?id_token=${user.idToken}
            // maybe for clients to retrieve more fields https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}
            try {
                const googleOAuthClient: OAuth2Client = new OAuth2Client();
                const loginTicket: LoginTicket = await googleOAuthClient.verifyIdToken({ idToken });
                const { azp, email: emailAddress }: TokenPayload = loginTicket.getPayload() as TokenPayload;

                if (googleClientId !== azp) throw new Error('Google id token not issued for this service');

                return { emailAddress };
            } catch (error) {
                logger.error(error);
                return;
            }
        },
    };
}
