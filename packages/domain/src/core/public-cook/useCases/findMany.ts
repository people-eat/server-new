import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBUser } from '../../../data-source';
import packLocation from '../../packLocation';
import { type FindManyRequest } from '../../shared';
import { type PublicCook } from '../PublicCook';

export interface FindManyPublicCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyPublicCooksInput): Promise<PublicCook[] | undefined> {
    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findMany({});

    if (!cooks) return;

    const publicCooks: PublicCook[] = [];

    for (const cook of cooks) {
        if (!cook.isVisible || cook.isLocked) continue;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });

        if (!user) continue;

        publicCooks.push({ ...packLocation(cook), user });
    }

    return publicCooks;
}
