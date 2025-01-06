import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type Location, type NanoId } from '../../shared';

export interface UpdateCookLocationInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        location: Location;
    };
}

export async function updateLocation({ runtime, context, request }: UpdateCookLocationInput): Promise<boolean> {
    const { dataSourceAdapter, logger, publisher } = runtime;
    const {
        cookId,
        location: { latitude, longitude },
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { latitude, longitude });

    if (!success) return false;

    await publisher.publish(cookId, { sessionUpdates: {} });

    return true;
}
