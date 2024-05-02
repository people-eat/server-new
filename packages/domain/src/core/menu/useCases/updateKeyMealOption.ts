import { Authorization, type DataSource, type Logger } from '../../..';
import { type DBMenu } from '../../../data-source';
import { type NanoId } from '../../shared';

export interface UpdateMenuIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        keyMealOption?: { courseId: NanoId; index: number };
    };
}

export async function updateKeyMealOption({ dataSourceAdapter, logger, context, request }: UpdateMenuIsVisibleInput): Promise<boolean> {
    const { cookId, menuId, keyMealOption } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const update: Partial<DBMenu> = keyMealOption
        ? { keyMealOptionCourseId: keyMealOption.courseId, keyMealOptionIndex: keyMealOption.index }
        : { keyMealOptionCourseId: undefined, keyMealOptionIndex: undefined };

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne({ cookId, menuId }, update);

    return success;
}
