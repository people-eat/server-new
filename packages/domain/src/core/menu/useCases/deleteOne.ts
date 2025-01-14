import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneMenuInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; menuId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneMenuInput): Promise<boolean> {
    const { cookId, menuId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    // remove key meal option to solve foreign key violation
    await dataSourceAdapter.menuRepository.updateOne(
        { menuId, cookId },
        { keyMealOptionCourseId: undefined, keyMealOptionIndex: undefined },
    );

    const success: boolean = await dataSourceAdapter.menuRepository.deleteOne({ menuId, cookId });

    return success;
}
