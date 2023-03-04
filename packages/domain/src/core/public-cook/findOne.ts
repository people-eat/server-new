import { Authorization, Database, Logger } from '../../index.js';
import packLocation from '../packLocation.js';
import { PublicCook } from './PublicCook.js';

export interface FindOnePublicCookInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: string };
}

export async function findOne({ databaseAdapter, logger, context, request }: FindOnePublicCookInput): Promise<PublicCook | undefined> {
    const cook: Database.DBCook | undefined = await databaseAdapter.cookRepository.findOne({
        cookId: request.cookId,
        isLocked: false,
        isVisible: true,
    });

    if (!cook) return;

    const user: Database.DBUser | undefined = await databaseAdapter.userRepository.findOne({ userId: cook.cookId });

    if (!user) return;

    const { userId, firstName, profilePictureUrl } = user;

    return { ...packLocation(cook), user: { userId, firstName, profilePictureUrl } };
}
