import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuDescriptionInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        description: string;
    };
}

export async function updateDescription({ dataSourceAdapter, logger, context, request }: UpdateMenuDescriptionInput): Promise<boolean> {
    const { cookId, menuId, description } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, { description: description.trim() });

    return success;
}
