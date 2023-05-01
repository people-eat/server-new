import { type Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type PublicUser } from '../PublicUser';

export interface FindOnePublicUserInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { userId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOnePublicUserInput): Promise<PublicUser | undefined> {
    const { userId } = request;

    const user: DataSource.DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return;

    const { firstName, profilePictureUrl } = user;

    return {
        userId,
        firstName,
        profilePictureUrl,
    };
}
