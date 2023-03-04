import { Authorization, Database, Logger } from '../../index.js';
import packLocation from '../packLocation.js';
import { PublicCook } from './PublicCook.js';

export interface FindManyPublicCooksInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { searchText?: string };
}

export async function findMany({ databaseAdapter, logger, context }: FindManyPublicCooksInput): Promise<PublicCook[] | undefined> {
    const cooks: Database.DBCook[] | undefined = await databaseAdapter.cookRepository.findMany({ isLocked: false, isVisible: true });

    if (!cooks) return;

    const cooksWithUser: PublicCook[] = [];

    for (const cook of cooks) {
        const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ userId: cook.cookId });

        if (!user) break;

        const { userId, firstName, profilePictureUrl } = user;

        cooksWithUser.push({ ...packLocation(cook), user: { userId, firstName, profilePictureUrl } });
    }

    return cooksWithUser;
}
