import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookBiographyInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        biography: string;
    };
}

export async function updateBiography({ dataSourceAdapter, logger, context, request }: UpdateCookBiographyInput): Promise<boolean> {
    const { cookId, biography } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { biography: biography.trim() });

    return success;
}
