import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBUser } from '../../../data-source';
import packLocation from '../../packLocation';
import { type PublicCook } from '../PublicCook';

export interface FindManyPublicCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
}

// Dorian: 4S16A2qyMTXK2HwzTrWD
// Rene: 8C22iHhhm2wFfVfrf4nw
// Simon: 8CoTZjWkSQZD7EL4l6dV
// Uta: sQiSQjbPB3wJrZjdLVKO

const heroCookIds: string[] = ['4S16A2qyMTXK2HwzTrWD', '8C22iHhhm2wFfVfrf4nw', '8CoTZjWkSQZD7EL4l6dV', 'sQiSQjbPB3wJrZjdLVKO'];

export async function findHeroes({ dataSourceAdapter }: FindManyPublicCooksInput): Promise<PublicCook[] | undefined> {
    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findMany({});

    if (!cooks) return;

    const publicCooks: PublicCook[] = [];

    for (const cook of cooks) {
        if (!cook.isVisible || cook.isLocked || !heroCookIds.includes(cook.cookId)) continue;

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });

        if (!user) continue;

        publicCooks.push({ ...packLocation(cook), user });
    }

    return publicCooks;
}
