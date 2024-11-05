import { type Authorization, type DataSource, type Logger } from '../../..';
import { type DBUser } from '../../../data-source';
import { geoDistance } from '../../../utils/geoDistance';
import packLocation from '../../packLocation';
import { type FindManyPublicCooksRequest } from '../FindManyPublicCooksRequest';
import { type PublicCook } from '../PublicCook';

export interface FindManyPublicCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyPublicCooksRequest;
}

export async function findMany({ dataSourceAdapter, request }: FindManyPublicCooksInput): Promise<PublicCook[] | undefined> {
    const cooks: DataSource.DBCook[] | undefined = await dataSourceAdapter.cookRepository.findAll();

    if (!cooks) return;

    const publicCooks: PublicCook[] = [];

    for (const cook of cooks) {
        if (!cook.isVisible || cook.isLocked) continue;

        // check geo distance
        if (request.location) {
            const { latitude, longitude } = cook;
            const distance: number = geoDistance({ location1: request.location, location2: { latitude, longitude } });
            if (cook.maximumTravelDistance && distance > cook.maximumTravelDistance) continue;
        }

        const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cook.cookId });

        if (!user) continue;

        publicCooks.push({ ...packLocation(cook), user });
    }

    return publicCooks;
}
