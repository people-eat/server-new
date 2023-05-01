import { Authorization, type DataSource, type Logger } from '../../..';
import { type Location, type NanoId } from '../../shared';

export interface UpdateCookLocationInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        location: Location;
    };
}

export async function updateLocation({ dataSourceAdapter, logger, context, request }: UpdateCookLocationInput): Promise<boolean> {
    const {
        cookId,
        location: { latitude, longitude },
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { latitude, longitude });

    return success;
}
