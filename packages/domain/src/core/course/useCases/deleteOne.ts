import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface DeleteOneCourseInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; menuId: NanoId; courseId: NanoId };
}

export async function deleteOne({ dataSourceAdapter, logger, context, request }: DeleteOneCourseInput): Promise<boolean> {
    const { cookId, menuId, courseId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.courseRepository.deleteOne({ cookId, menuId, courseId });

    return success;
}
