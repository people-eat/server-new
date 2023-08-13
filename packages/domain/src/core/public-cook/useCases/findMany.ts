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

export async function findMany({ dataSourceAdapter, logger }: FindManyPublicCooksInput): Promise<PublicCook[] | undefined> {
    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findMany({});

    logger.info({ cooks });

    if (!cooks) return;

    const publicCooks: PublicCook[] = [];

    for (const cook of cooks) {
        logger.info({ cookId: cook.cookId, step: 1 });
        if (!cook.isVisible || cook.isLocked) break;

        logger.info({ cookId: cook.cookId, step: 2 });
        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });
        logger.info({ cookId: cook.cookId, step: 3 });

        if (!user) break;
        logger.info({ cookId: cook.cookId, step: 4 });

        publicCooks.push({ ...packLocation(cook), user });
    }

    return publicCooks;
}
