import { type DBUser } from '../../../data-source/index';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneOneTimeAccessTokenForEmailAddressRequest } from '../CreateOneOneTimeAccessTokenForEmailAddressRequest';

interface CreateOneOneTimeAccessTokenInput {
    runtime: Runtime;
    request: CreateOneOneTimeAccessTokenForEmailAddressRequest;
}

export async function createOneForEmailAddress({
    runtime: { dataSourceAdapter, logger: _logger, webAppUrl, klaviyoEmailAdapter },
    request: { emailAddress },
}: CreateOneOneTimeAccessTokenInput): Promise<boolean> {
    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ emailAddress });

    if (!user || !user.emailAddress) return false;

    const secret: NanoId = createNanoId();

    const persistingSuccess: boolean = await dataSourceAdapter.oneTimeAccessTokenRepository.insertOne({
        userId: user.userId,
        secret,
        createdAt: new Date(),
    });

    if (!persistingSuccess) return false;

    await klaviyoEmailAdapter.sendResetPassword({
        recipient: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
        },
        data: { url: `${webAppUrl}/forgot-password/confirm/${secret}` },
    });

    return true;
}
