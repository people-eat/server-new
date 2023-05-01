import { Authorization, type DataSource, type Logger } from '../../..';
import { type Gender, type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: NanoId;
        gender: Gender;
    };
}

export async function updateGender({ dataSourceAdapter, logger, context, request }: UpdateCookIsVisibleInput): Promise<boolean> {
    const { userId, gender } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.userRepository.updateOne({ userId }, { gender });

    return success;
}
