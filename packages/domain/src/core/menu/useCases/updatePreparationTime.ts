import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuPreparationTimeInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        preparationTime: number;
    };
}

export async function updatePreparationTime({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateMenuPreparationTimeInput): Promise<boolean> {
    const { cookId, menuId, preparationTime } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { preparationTime });

    return success;
}
