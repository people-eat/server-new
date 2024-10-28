import { type Authorization } from '../../..';
import { type DBOneTimeAccessToken } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

interface CreateOneOneTimeAccessTokenInput {
    runtime: Runtime;
    context: Authorization.Context & { userCreation?: boolean };
    request: { secret: NanoId };
}

export async function confirmOne({
    runtime: { dataSourceAdapter, logger },
    context,
    request: { secret },
}: CreateOneOneTimeAccessTokenInput): Promise<boolean> {
    const oneTimeAccessToken: DBOneTimeAccessToken | undefined = await dataSourceAdapter.oneTimeAccessTokenRepository.findOne({ secret });

    if (!oneTimeAccessToken) return false;

    const { userId } = oneTimeAccessToken;

    const deletionSuccess: boolean = await dataSourceAdapter.oneTimeAccessTokenRepository.deleteOne({ secret });

    if (!deletionSuccess) logger.error(`Could not delete phone number update with secret ${secret} for user ${userId}`);

    const { sessionId } = context;

    await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });

    return true;
}
