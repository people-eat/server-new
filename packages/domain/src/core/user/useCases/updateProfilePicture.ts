import { createWriteStream, type ReadStream } from 'fs';
import { join } from 'path';
import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    serverUrl: string;
    context: Authorization.Context;
    request: {
        userId: NanoId;
        profilePicture?: ReadStream;
    };
}

export async function updateProfilePicture({
    dataSourceAdapter,
    logger,
    serverUrl,
    context,
    request,
}: UpdateCookIsVisibleInput): Promise<boolean> {
    const { userId, profilePicture } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    let profilePictureUrl: string | undefined;

    if (profilePicture) {
        const profilePictureId: NanoId = createNanoId();
        profilePictureUrl = serverUrl + '/profile-pictures/' + profilePictureId;
        await new Promise<boolean>((resolve: (success: boolean) => void, reject: (success: boolean) => void) =>
            profilePicture
                .pipe(createWriteStream(join(process.cwd(), `images/profile-pictures/${profilePictureId}.png`)))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false)),
        );
    }

    const success: boolean = await dataSourceAdapter.userRepository.updateOne({ userId }, { profilePictureUrl });

    return success;
}
